import { NextRequest, NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { brandMonitors } from '@/lib/db/schema';
import { handleApiError, AuthenticationError, NotFoundError } from '@/lib/api-errors';
import { ONE_DAY } from '@/config/constants';

type Params = { params: Promise<{ id: string }> };

// PATCH /api/monitors/[id] { active: boolean } - pause or resume
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) throw new AuthenticationError('Please log in');
    const { id } = await params;
    const { active } = await request.json();

    const [monitor] = await db.update(brandMonitors)
      .set(active
        ? { active: true, pausedReason: null, failureCount: 0, nextRunAt: new Date(Date.now() + ONE_DAY) }
        : { active: false, pausedReason: 'paused_by_user' })
      .where(and(eq(brandMonitors.id, id), eq(brandMonitors.userId, session.user.id)))
      .returning();
    if (!monitor) throw new NotFoundError('Monitor not found');
    return NextResponse.json(monitor);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/monitors/[id] - stop monitoring (past analyses are kept)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) throw new AuthenticationError('Please log in');
    const { id } = await params;

    const deleted = await db.delete(brandMonitors)
      .where(and(eq(brandMonitors.id, id), eq(brandMonitors.userId, session.user.id)))
      .returning({ id: brandMonitors.id });
    if (deleted.length === 0) throw new NotFoundError('Monitor not found');
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
