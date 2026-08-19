import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useWishlist } from '../hooks/useWishlist';

interface WishlistButtonProps {
  listingId: string;
  className?: string;
  size?: number;
}

export function WishlistButton({ listingId, className = '', size = 20 }: WishlistButtonProps) {
  const { isSaved, toggleWishlist } = useWishlist();
  const saved = isSaved(listingId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(listingId);
  };

  return (
    <motion.button
      id={`wishlist-btn-${listingId}`}
      type="button"
      whileTap={{ scale: 0.75 }}
      whileHover={{ scale: 1.12 }}
      transition={{ type: 'spring', stiffness: 450, damping: 17 }}
      onClick={handleClick}
      aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      className={`p-2 rounded-full focus:outline-none transition-colors ${className}`}
    >
      <Heart
        size={size}
        className={`transition-colors duration-200 ${
          saved
            ? 'fill-[#0EA5E9] text-[#0EA5E9] stroke-[#0EA5E9]'
            : 'fill-black/30 text-white stroke-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:fill-black/40'
        }`}
      />
    </motion.button>
  );
}
