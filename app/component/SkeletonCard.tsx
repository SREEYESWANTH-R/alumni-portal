import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <Card className="pt-4 gap-3 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <CardTitle>
          <Skeleton className="h-6 w-3/4 mt-2" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-80 h-52" />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
