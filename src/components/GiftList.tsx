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
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Gifts</h2>
      <div className="space-y-3">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-slate-900">{gift.guest_name}</h3>
              <span className="text-xs text-slate-400">
                {new Date(gift.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{gift.gift_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
