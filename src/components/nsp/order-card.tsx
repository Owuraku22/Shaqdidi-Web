import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHandle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Order, manageOrder, fetchOrderDetails } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Hidden } from '@/components/ui/hidden';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Loader2 } from 'lucide-react';

interface OrderCardProps extends Order {
  onMarkCompleted: (id: number) => void;
  activeTab: string;
}

export default function OrderCard({
  id,
  joint_name,
  joint_image,
  address,
  status,
  amount,
  date,
  name,
  note,
  personnel_phone_number,
  staff_phone_number,
  staff_name,
  onMarkCompleted,
  activeTab
}: OrderCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { isMobile } = useMediaQuery();

  const { data: orderDetails, isLoading, isError } = useQuery({
    queryKey: ['orderDetails', id],
    queryFn: () => fetchOrderDetails(id),
    enabled: isModalOpen,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMarkCompleted = async () => {
    try {
      await manageOrder(id, 'completed');
      onMarkCompleted(id);
      setIsModalOpen(false);
      queryClient.invalidateQueries({queryKey: ['orders']});
    } catch (error) {
      console.error('Failed to mark order as completed:', error);
    }
  };

  const OrderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex justify-center items-center h-64">
          <p>Error loading order details. Please try again.</p>
        </div>
      );
    }

    console.log(status)
    const details = orderDetails || {
      joint_name,
      joint_image,
      address,
      status,
      amount,
      date,
      name,
      note,
      personnel_phone_number,
      staff_phone_number,
      staff_name
    };

    return (
      <>
        <div className="relative w-full bg-gradient-to-b from-black to-transparent bg-opacity-20 rounded-t-2xl">
          <img src={details.joint_image} alt={details.joint_name} className="w-full h-44 object-cover rounded-t-lg" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2 pl-6">
            <h3 className="text-lg font-semibold">{details.joint_name}</h3>
            <p className="text-sm">{details.address}</p>
          </div>
        </div>
        <div className="grid gap-4 py-4 px-7">
          <div className="flex flex-col gap-4">
            <span className="font-semibold text-red-500">Amount</span>
            <span className="col-span-3 border rounded-lg px-3 py-2"> GHC {details.amount}</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-semibold text-red-500">Note</span>
            <span className="col-span-3 border rounded-lg px-3 py-2">{details.note}</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-semibold text-red-500">Assigned Personnel</span>
            <span className="col-span-3 border rounded-lg px-3 py-2">{details.name || details.staff_name || 'No personnel assigned'}</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-semibold text-red-500">Phone Number</span>
            <span className="col-span-3 border rounded-lg px-3 py-2">{details.personnel_phone_number || details.staff_phone_number || 'No phone number available'}</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-semibold text-red-500">Status</span>
            <span className="col-span-3 border rounded-lg px-3 py-2">{details.status}</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-semibold text-red-500">Date</span>
            <span className="col-span-3 border rounded-lg px-3 py-2">{new Date(details.date).toLocaleDateString()}</span>
          </div>
        </div>
      </>
    );
  };

  const FooterContent = () => (
    <>
      {activeTab === 'today' && status === 'pending' ? (
        <>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button onClick={handleMarkCompleted} className="bg-red-500 hover:bg-red-600">
            Complete Order
          </Button>
        </>
      ) : (
        <Button onClick={handleCloseModal}>
          Back
        </Button>
      )}
    </>
  );

  const CardTrigger = (
    <Card className="w-full cursor-pointer" onClick={handleOpenModal}>
      <CardContent className="p-0 rounded-t-lg">
        <img src={joint_image} alt={joint_name} className="w-full h-40 rounded-t-xl object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{joint_name}</h3>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">{address}</p>
            <p className='font-normal text-sm text-gray-500'>Status: 
              <span className={cn('font-normal', {
                'text-amber-400': status === 'pending',
                'text-green-400': status === 'completed',
                'text-red-400': status === 'cancelled',
              })}> {status.substring(0, 1).toUpperCase() + status.substring(1)}</span>
            </p>
          </div>
          <div className="mt-2 text-sm text-gray-500 flex justify-between w-full">
            <span className="font-semibold"> GHC {amount}</span>
            <p>{new Date(date).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DrawerTrigger asChild>
            {CardTrigger}
          </DrawerTrigger>
          <DrawerContent className={cn('max-h-[calc(100vh-6rem)] border-none')}>
            <DrawerHandle className='w-16 h-3 rounded-full bg-gray-300 mb-2' />
            <Hidden>
              <h2 className="sr-only">Order Details</h2>
              <p className="sr-only">Description of the order goes here</p>
            </Hidden>
            <ScrollArea className="overflow-y-auto">
              <OrderContent />
            </ScrollArea>
            <DrawerFooter>
              <FooterContent />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            {CardTrigger}
          </DialogTrigger>
          <DialogContent className="max-h-dvh p-0 border-none md:min-w-[50rem] rounded-t-2xl [&>button]:hidden">
            <Hidden>
              <h2 className="sr-only">Order Details</h2>
              <p className="sr-only">Description of the order goes here</p>
            </Hidden>
            <OrderContent />
            <DialogFooter className='p-5'>
              <FooterContent />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}