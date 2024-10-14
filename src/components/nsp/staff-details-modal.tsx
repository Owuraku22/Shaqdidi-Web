import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
  } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
  
  interface StaffMember {
    name: string;
    team: string;
    email: string;
    phoneNumber: string;
  }
  
  interface StaffDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    staff: StaffMember;
  }
  
  export default function StaffDetailsModal({ isOpen, onClose, staff }: StaffDetailsModalProps) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-500">Staff Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-red-500">Name</h3>
              <p>{staff.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-500">Team</h3>
              <p>{staff.team}</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-500">Email</h3>
              <p>{staff.email}</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-500">Phone Number</h3>
              <p>{staff.phoneNumber}</p>
            </div>
          </div>
          <DialogClose asChild>
            <Button className="mt-4">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }