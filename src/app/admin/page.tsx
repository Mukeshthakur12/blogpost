import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
    const [postCount, categoryCount, userCount] = await Promise.all([
        prisma.post.count(),
        prisma.category.count(),
        prisma.user.count(),
    ]);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{postCount}</div>
                        <p className="text-xs text-muted-foreground">Articles, reviews, and guides</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{categoryCount}</div>
                        <p className="text-xs text-muted-foreground">Active categories</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userCount}</div>
                        <p className="text-xs text-muted-foreground">Registered admins</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
