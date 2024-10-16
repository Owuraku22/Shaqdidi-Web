import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Order } from '@/lib/api';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';

interface OrderCardProps extends Order {
  onMarkCompleted: (id: string) => void;
}

export default function OrderCard({
  id,
  image,
  title,
  location,
  status,
  price,
  date,
  staffName,
  note,
  phoneNumber,
  onMarkCompleted,
}: OrderCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkCompleted = () => {
    setIsModalOpen(true);
  };

  const confirmMarkCompleted = () => {
    onMarkCompleted(id);
    setIsModalOpen(false);
  };

  return (
    <>
      

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Card className="w-full cursor-pointer">
          <CardContent className="p-0 rounded-t-lg">
            <img src={image} alt={title} className="w-full h-40 rounded-t-xl object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">{location}</p>
                <p className='font-normal text-sm text-gray-500'>Status: 
                  <span className={cn('font-normal', {
                    'text-amber-400': status === 'Pending',
                    'text-green-400': status === 'Completed',
                    'text-red-400': status === 'Cancelled',
                  })}> {status}</span>
                </p>
            
              </div>
              <div className="mt-2 text-sm text-gray-500 flex justify-between w-full">
                <span className="font-semibold">{price}</span>
                <p>{new Date(date).toLocaleDateString()}</p>
              </div>
          </div>
          </CardContent>
          {/* <CardFooter className="p-4 flex justify-end">
            {status === 'Pending' && (
              <Button onClick={handleMarkCompleted} className="">
                Mark as Completed
              </Button>
            )}
          </CardFooter> */}
        </Card>
        </DialogTrigger>
        <DialogContent className="max-h-dvh p-0 border-none md:min-w-[50rem] rounded-t-2xl">
          {/* <ScrollArea className=""> */}
          <div className="relative w-full bg-gradient-to-b from-black to-transparent bg-opacity-20 rounded-t-2xl">
            <img src={image} alt={title} className="w-full h-44  object-cover rounded-t-lg" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2 pl-6">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm">{location}</p>
            </div>
          </div>
          <div className="grid gap-4 py-4 px-7">
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-red-500">Amount</span>
              <span className="col-span-3 border rounded-md px-3 py-2">{price}</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-red-500">Note</span>
              <span className="col-span-3 border rounded-md px-3 py-2">{note}</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-red-500">Assigned Personnel</span>
              <span className="col-span-3 border rounded-md px-3 py-2">{staffName}</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-red-500">Phone Number</span>
              <span className="col-span-3 border rounded-md px-3 py-2">{phoneNumber}</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-red-500">Status</span>
              <span className="col-span-3 border rounded-md px-3 py-2">{status}</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-red-500">Date</span>
              <span className="col-span-3 border rounded-md px-3 py-2">{date}</span>
            </div>
          </div>
          <DialogFooter className='p-5'>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmMarkCompleted} className="bg-red-500 hover:bg-red-600">
              Confirm Order
            </Button>
          </DialogFooter>
          {/* </ScrollArea> */}
          
        </DialogContent>
      </Dialog>
    </>
  );
}