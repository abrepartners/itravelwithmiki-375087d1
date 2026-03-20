import { useGalleryImages } from '@/stores/galleryStore';

const FooterGallery = () => {
  const images = useGalleryImages();

  if (images.length === 0) {
    return null;
  }

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden bg-primary/5 py-4">
      <div 
        className="flex gap-4 animate-scroll-left hover:[animation-play-state:paused]"
        style={{
          width: `${duplicatedImages.length * 200}px`,
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`${image.id}-${index}`}
            className="relative flex-shrink-0 w-[180px] h-[100px] md:w-[200px] md:h-[120px] rounded-lg overflow-hidden group"
          >
            <img
              src={image.url}
              alt={image.caption || 'Travel memory'}
              className="w-full h-full object-cover transition-all duration-500"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {image.caption && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <p className="text-white text-xs font-medium truncate w-full">
                  {image.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterGallery;
