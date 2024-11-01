import { useLoaderData } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { UserProfile } from '@/lib/api';

interface UserProfile {
  name: string;
  image: string;
  role: string;
  bio: string;
  email: string;
  phoneNumber: number;
  joinDate: Date
}

export default function Profile() {
  const profile = useLoaderData() as UserProfile;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.image} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-gray-500">{profile.role}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Bio</h3>
              <p>{profile.bio}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <p>Email: {profile.email}</p>
              <p>Phone: {profile.phoneNumber}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Join Date</h3>
              <p>{new Date(profile.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}