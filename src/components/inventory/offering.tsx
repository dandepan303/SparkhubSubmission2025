import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Offering, OfferingPostArgs, User } from '@/types';
import { useEffect, useState } from 'react';
import { MdAttachMoney, MdInventory, MdCalendarToday } from 'react-icons/md';
import { useAuth } from '../auth/auth-provider';

interface OfferingCardArgs {
  offering: Offering;
  onUpdate: (newOffering: OfferingPostArgs) => void;
  onDelete: (offeringId: string) => void;
  onSpend: (offeringId: string) => void;
}

export default function OfferingCard({ offering, onUpdate, onDelete, onSpend }: OfferingCardArgs) {
  const { user, profile } = useAuth();

  const [userRole, setUserRole] = useState<'owner' | 'spender' | 'standard'>('standard');

  useEffect(() => {
    if (user.loading || profile.loading) return;

    if (user.data.id === offering.userId) setUserRole('owner');
    else if (profile.data.jobsWorking.some(job => job.hirerId === offering.userId && job.status === 'COMPLETED' && job.payment > 0))
      setUserRole('spender');
  }, [profile, offering]);

  // Format the date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="w-full max-w-sm transition-shadow duration-200 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg font-semibold text-gray-900">{offering.description}</CardTitle>
        <CardDescription className="text-sm text-gray-600">Created on {formatDate(offering.createdAt.toString())}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Cost Display */}
        <div className="flex items-center space-x-2">
          <MdAttachMoney className="text-xl text-green-600" />
          <span className="text-lg font-bold text-green-600">{offering.cost}</span>
        </div>

        {/* Quantity Display (if available) */}
        {offering.quantity !== null && (
          <div className="flex items-center space-x-2">
            <MdInventory className="text-lg text-blue-600" />
            <span className="text-sm text-gray-700">Quantity: {offering.quantity}</span>
          </div>
        )}

        {/* Last Updated */}
        <div className="flex items-center space-x-2">
          <MdCalendarToday className="text-sm text-gray-500" />
          <span className="text-xs text-gray-500">Updated: {formatDate(offering.updatedAt.toString())}</span>
        </div>

        {userRole === 'owner' && <div>todo: edit button for changing & deleting these values - line 64</div>}
        {userRole === 'spender' && <button onClick={() => onSpend(offering.id)}>Exchange one</button>}
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-2">
        <div className="text-xs text-gray-500">ID: {offering.id.slice(0, 8)}...</div>

        {/* Status indicator */}
        <div className="flex items-center space-x-1">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-600">Active</span>
        </div>
      </CardFooter>
    </Card>
  );
}
