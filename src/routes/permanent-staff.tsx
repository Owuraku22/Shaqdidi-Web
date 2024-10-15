import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { Staff } from '@/lib/api';

export default function PermanentStaff() {
  const staffMembers = useLoaderData() as Staff[];
  const [search, setSearch] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(search.toLowerCase()) ||
    staff.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <h1 className="md:text-3xl font-bold mb-4 md:mb-0">Know Your Permanent Staff</h1>
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Role</TableHead>
              <TableHead className="font-bold">Email</TableHead>
              <TableHead className="font-bold">Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((staff) => (
              <TableRow key={staff.id} className="cursor-pointer hover:bg-gray-100" onClick={() => setSelectedStaff(staff)}>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedStaff} onOpenChange={() => setSelectedStaff(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Staff Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected staff member.
            </DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedStaff.image} alt={selectedStaff.name} />
                  <AvatarFallback>{selectedStaff.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedStaff.name}</h3>
                  <p className="text-sm text-gray-500">{selectedStaff.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Email:</span>
                <span className="col-span-3">{selectedStaff.email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Phone:</span>
                <span className="col-span-3">{selectedStaff.phoneNumber}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}