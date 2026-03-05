'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, User, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoAvatarProps {
  size?: number;
  className?: string;
  editable?: boolean;
}

export default function PhotoAvatar({ size = 176, className = '', editable = true }: PhotoAvatarProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('user_photo');
    if (saved) setPhotoUrl(saved);
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Resize image to save storage space
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 400;
        let w = img.width;
        let h = img.height;
        if (w > h) { h = (h / w) * maxSize; w = maxSize; }
        else { w = (w / h) * maxSize; h = maxSize; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL('image/jpeg', 0.8);
          setPhotoUrl(compressed);
          localStorage.setItem('user_photo', compressed);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoUrl(null);
    localStorage.removeItem('user_photo');
  }, []);

  return (
    <div className={`relative group ${className}`}>
      <motion.div
        className="relative overflow-hidden rounded-2xl border-2 cursor-pointer"
        style={{
          width: size,
          height: size,
          borderColor: isDragging
            ? 'rgba(99, 102, 241, 0.6)'
            : photoUrl
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(255,255,255,0.06)',
          background: photoUrl
            ? 'transparent'
            : 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.06))',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => editable && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {photoUrl ? (
          <>
            <img
              src={photoUrl}
              alt="User photo"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.12)' }}>
              <User className="w-7 h-7 text-primary/60" />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground/60">
              {isDragging ? 'Отпустите фото' : 'Загрузить фото'}
            </span>
          </div>
        )}

        {/* Hover overlay for editing */}
        <AnimatePresence>
          {editable && isHovering && photoUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 border border-white/10">
                  <Camera className="w-3.5 h-3.5 text-white/80" />
                  <span className="text-xs font-medium text-white/80">Изменить</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag overlay */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-sm border-2 border-dashed border-primary/40 rounded-2xl"
            >
              <div className="flex flex-col items-center gap-1">
                <Camera className="w-6 h-6 text-primary" />
                <span className="text-xs font-semibold text-primary">Отпустите</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Remove button */}
      <AnimatePresence>
        {photoUrl && editable && isHovering && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleRemove}
            className="absolute -top-2 -right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-card border border-border shadow-lg hover:bg-destructive/20 hover:border-destructive/30 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
