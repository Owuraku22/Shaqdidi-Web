import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderHistoryCard from "./order-history-card";
import { cn } from '@/lib/utils';
import OrderHistoryEmpty from "./order-history-empty";

import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/lib/api";


export default function OrderHistory() {
    const [activeTab, setActiveTab] = useState('current');
    const { data } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchOrders,
    })

    console.log(data)

    return(
    <>
    <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full  mb-4 bg-transparent flex md:justify-start justify-center space-x-2 text-[18px] font-roboto font-[600]">
          <TabsTrigger value="current" className={cn('rounded-full py-2 px-10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary shadow', { 'bg-primary text-white': activeTab === 'current' })}>Current History</TabsTrigger>
          <TabsTrigger value="previous" className={cn('rounded-full py-2 px-10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary shadow', { 'bg-primary text-white': activeTab === 'previous' })}>Previous History</TabsTrigger>
        </TabsList>
        <TabsContent value="current">
        {
            !data?.length  ? (
                <OrderHistoryEmpty />
            ) : (
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {data?.filter(e => e.status === "Pending").map(order => (
                    <OrderHistoryCard
                      key={order.id}
                      {...order}
                      activeTab={activeTab}
                    />
                  ))}
                </div>
            )
        }
        </TabsContent>
        <TabsContent value="previous">
        {
            !data?.length ? (
                <OrderHistoryEmpty />
            ) : (
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {data?.filter(e => (e.status === "Completed" || e.status === "Cancelled")).map(order => (
                    <OrderHistoryCard
                        key={order.id}
                        {...order}
                        activeTab={activeTab}
                    />
                    ))}
                </div>
            )
        }
        </TabsContent>
      </Tabs>

        {/* <div className="my-6 p-2 flex text-md font-bold">
            <span onClick={() => setIsActive('current') } className={`${ isActive === 'current' ? "bg-primary-foreground text-primary" : "bg-inherit shadow-sm"} block  py-2 px-4 rounded-full cursor-pointer`}>Current Order</span>
            <span onClick={() => setIsActive('previous') } className={`${ isActive === 'current' ? "bg-inherit shadow-sm" : "bg-primary-foreground text-primary"} block py-2 px-4 rounded-full cursor-pointer`}>Previous Orders</span>
        </div>
        {
            isCurrentOrderEmpty ? (
                <div className="flex flex-col justify-center items-center gap-4 py-10">
                    <img src={'/no-history.png'} alt="no order history" width={200} height={200} />
                    <p className="mb-2 text-sm text-center">You have no order. <span className="text-slate-800 font-bold">Go Home</span> and make an Order</p>
                    <Button onClick={() => navigate('/')}>Go Home</Button>
                </div>
            ) : (
                <div className="w-1/3 shadow-md rounded-l-2xl rounded-r-2xl">
                    <div className="object-cover rounded-l-2xl rounded-r-2xl">
                        <img src="/food.png" className="w-full object-fit object-center " />
                    </div>
                    <div className="p-4 space-y-1">
                        <h1 className="text-xl"></h1>
                        <p className="text-gray-500 text-sm flex justify-between">
                            <span>Haatso Station</span>
                            <span>Status: <span className="text-yellow-600">Pending</span></span>
                        </p>
                        <p className="text-gray-500 text-sm flex justify-between">
                            <span className="font-bold">GHC 43.00</span>
                            <span>03/10/2024</span>
                        </p>
                    </div>
                </div>
            )
        } */}
    </>
    )
}