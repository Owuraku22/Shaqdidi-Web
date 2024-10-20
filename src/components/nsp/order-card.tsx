import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Order, manageOrder } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Hidden } from '@/components/ui/hidden';

interface OrderCardProps extends Order {
  onMarkCompleted: (id: number) => void;
  activeTab: string;
}

export default function OrderCard({
  id,
  joint_name,
  address,
  status,
  amount,
  date,
  name,
  note,
  phone_number,
  onMarkCompleted,
  activeTab
}: OrderCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);

  const handleMarkCompleted = async () => {
    try {
      await manageOrder(id, 'Completed');
      onMarkCompleted(id);
      setIsModalOpen(false);
      queryClient.invalidateQueries({queryKey: ['orders']});
    } catch (error) {
      console.error('Failed to mark order as completed:', error);
    }
  };

  const OrderContent = () => (
    <>
      <div className="relative w-full bg-gradient-to-b from-black to-transparent bg-opacity-20 rounded-t-2xl">
        <img src="/placeholder.png" alt={joint_name} className="w-full h-44 object-cover rounded-t-lg" />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2 pl-6">
          <h3 className="text-lg font-semibold">{joint_name}</h3>
          <p className="text-sm">{address}</p>
        </div>
      </div>
      <div className="grid gap-4 py-4 px-7">
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-red-500">Amount</span>
          <span className="col-span-3 border rounded-lg px-3 py-2"> GHC {amount}</span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-red-500">Note</span>
          <span className="col-span-3 border rounded-lg px-3 py-2">{note}</span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-red-500">Assigned Personnel</span>
          <span className="col-span-3 border rounded-lg px-3 py-2">{name}</span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-red-500">Phone Number</span>
          <span className="col-span-3 border rounded-lg px-3 py-2">{phone_number}</span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-red-500">Status</span>
          <span className="col-span-3 border rounded-lg px-3 py-2">{status}</span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-red-500">Date</span>
          <span className="col-span-3 border rounded-lg px-3 py-2">{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
    </>
  );

  const FooterContent = () => (
    <>
      {activeTab === 'today' && status === 'Pending' ? (
        <>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleMarkCompleted} className="bg-red-500 hover:bg-red-600">
            Confirm Order
          </Button>
        </>
      ) : (
        <Button onClick={() => setIsModalOpen(false)}>
          Back
        </Button>
      )}
    </>
  );

  const CardTrigger = (
    <Card className="w-full cursor-pointer">
      <CardContent className="p-0 rounded-t-lg">
        <img src="/placeholder.png" alt={joint_name} className="w-full h-40 rounded-t-xl object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{joint_name}</h3>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">{address}</p>
            <p className='font-normal text-sm text-gray-500'>Status: 
              <span className={cn('font-normal', {
                'text-amber-400': status === 'Pending',
                'text-green-400': status === 'Completed',
                'text-red-400': status === 'Cancelled',
              })}> {status}</span>
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
        <Drawer open={isModalOpen} onOpenChange={setIsModalOpen} shouldScaleBackground repositionInputs>
        <DrawerTrigger asChild>
          {CardTrigger}
        </DrawerTrigger>
        <DrawerContent className={cn('max-h-[calc(100vh-4rem)] border-none')}>
          <DrawerHandle className='w-16 h-3 rounded-full bg-gray-300 mb-2' />
          <Hidden>
              <DrawerTitle className="p-5">Order Details</DrawerTitle>
              <DrawerDescription className="p-5">
                Description of the order goes here
              </DrawerDescription>
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
          <DialogContent className="max-h-dvh p-0 border-none md:min-w-[50rem] rounded-t-2xl">
            <Hidden>
              <DialogTitle className="p-5">Order Details</DialogTitle>
              <DialogDescription className="p-5">
                Description of the order goes here
              </DialogDescription>
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