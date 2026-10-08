import DashboardSkeleton from '@/app/ui/skeletons';
/*Более не нужен, поскольку у всех дочених элементов
  есть свой Suspence*/
export default function Loading() {
    return <DashboardSkeleton />;
}