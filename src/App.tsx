import { useEffect, useState } from 'react';
import GiftForm from './components/GiftForm';
import GiftList from './components/GiftList';
import { supabase } from './lib/supabase';
import { WeddingGift } from './types/gift';

function App() {
  const [gifts, setGifts] = useState<WeddingGift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showGifts, setShowGifts] = useState(false);

  const fetchGifts = async () => {
    const { data, error } = await supabase
      .from('wedding_gifts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching gifts:', error);
      return;
    }

    setGifts(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div
        className="fixed inset-0 opacity-5 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      />

      <header className="relative z-20 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light text-yellow-600 tracking-tight">Celebrating Kweku & Maame</h1>
            <p className="text-slate-500 mt-2 text-sm font-light">Thank you for coming</p>
          </div>
          <button
            onClick={() => setShowGifts(!showGifts)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded transition-colors"
          >
            {showGifts ? 'Show Form' : 'View Gifts'}
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {!showGifts ? (
          <div className="max-w-md mx-auto">
            <GiftForm onGiftAdded={fetchGifts} />
          </div>
        ) : (
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-slate-500 text-sm">Loading gifts...</p>
              </div>
            ) : (
              <GiftList gifts={gifts} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
