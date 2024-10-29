import { useRouteError } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PersonnelError() {
    // const error = useRouteError() as Error;

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Alert variant="destructive" className="w-full">
          {/* <AlertCircle className="h-4 w-4" /> */}
          <AlertTitle></AlertTitle>
          <AlertDescription className="text-[18px]">
            {/* {error.message || "An unexpected error occurred."} */}
            Please there are no Personnel <br /> available to place an order
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
