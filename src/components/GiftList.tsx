import { WeddingGift } from '../types/gift';

interface GiftListProps {
  gifts: WeddingGift[];
}

export default function GiftList({ gifts }: GiftListProps) {
  if (gifts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-sm">No gifts recorded yet</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Gifts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200 aspect-square flex flex-col"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-slate-900">{gift.guest_name}</h3>
              <span className="text-xs text-slate-400">
                {new Date(gift.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            {gift.phone_number && (
              <p className="text-xs text-slate-500 mb-3">{gift.phone_number}</p>
            )}
            <p className="text-sm text-slate-600 leading-relaxed flex-grow overflow-y-auto">{gift.gift_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
