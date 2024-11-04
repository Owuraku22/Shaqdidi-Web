import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderHistoryCard from "./order-history-card";
import { cn } from "@/lib/utils";
import OrderHistoryEmpty from "./order-history-empty";

import { useQuery } from "@tanstack/react-query";
import { Order, fetchOrders, manageOrder, queryKeys } from "@/lib/api";
import { Search, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useInfiniteQuery } from "@tanstack/react-query";
import OrderCard from "@/components/nsp/order-card";

export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState("current");
  // const { data } = useQuery({
  //     queryKey: ['ord'],
  //     queryFn: () => fetchOrders({pageParam: 1}),
  // })

  // console.log(data)

  const { toast } = useToast();
  // const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: queryKeys.orders.all,
    queryFn: () => {
      console.log("Fetching orders...");
      return fetchOrders({ pageParam: 1 });
    },
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      if (!lastPage?.pagination) return undefined;

      const { current_page, last_page } = lastPage.pagination;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  if (isError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message || "Failed to fetch orders",
    });
  }

  console.log("Logging Order data : ", data);
  // Flatten and process orders
  const allOrders = data?.pages.flatMap((page) => page.orders) ?? [];

  const currentOrders =
    allOrders.filter((ordered) => {
      if (ordered?.status) refetch();
      return ordered?.status.toLowerCase() === "pending";
    }) || [];
  const previousOrders =
    allOrders.filter((ordered) => {
      if (ordered?.status) refetch();
      return (
        ordered?.status.toLowerCase() === "completed" ||
        ordered?.status.toLowerCase() === "cancelled"
      );
    }) || [];

  const handleMarkCancelled = async (id: number) => {
    try {
      await manageOrder(id, "Cancelled");
      refetch();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to mark order as cancelled",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full  mb-4 bg-transparent flex md:justify-start justify-center space-x-2 text-[18px] font-roboto font-[600]">
          <TabsTrigger
            value="current"
            className={cn(
              "rounded-full py-2 px-10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary shadow",
              { "bg-primary text-white": activeTab === "current" }
            )}
          >
            Current History
          </TabsTrigger>
          <TabsTrigger
            value="previous"
            className={cn(
              "rounded-full py-2 px-10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary shadow",
              { "bg-primary text-white": activeTab === "previous" }
            )}
          >
            Previous History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="current">
          {currentOrders?.length === 0 ? (
            <OrderHistoryEmpty />
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {currentOrders?.map((order) => (
                <OrderCard
                  {...order}
                  onMarkCompleted={handleMarkCancelled}
                  activeTab={activeTab}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="previous">
          {!previousOrders?.length ? (
            <OrderHistoryEmpty />
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {previousOrders.map((order) => (
                <OrderCard
                  {...order}
                  onMarkCompleted={handleMarkCancelled}
                  activeTab={activeTab}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
