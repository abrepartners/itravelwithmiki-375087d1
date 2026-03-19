import { useState } from 'react';
import { Copy, Check, RefreshCw, Pencil, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  title: string;
  icon: React.ReactNode;
  content: string;
  subtitle?: string;
  platform: 'instagram' | 'facebook' | 'email' | 'sms' | 'calendar';
  charLimit?: number;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

const platformColors: Record<string, string> = {
  instagram: 'from-purple-500/10 to-pink-500/10 border-purple-200',
  facebook: 'from-blue-500/10 to-blue-600/10 border-blue-200',
  email: 'from-emerald-500/10 to-teal-500/10 border-emerald-200',
  sms: 'from-amber-500/10 to-orange-500/10 border-amber-200',
  calendar: 'from-slate-500/10 to-slate-600/10 border-slate-200',
};

const ContentCard = ({
  title,
  icon,
  content,
  subtitle,
  platform,
  charLimit,
  onRegenerate,
  isRegenerating,
}: ContentCardProps) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = editedContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  const charCount = editedContent.length;
  const isOverLimit = charLimit ? charCount > charLimit : false;

  return (
    <div
      className={cn(
        'rounded-xl border bg-gradient-to-br p-5 transition-all duration-300 hover:shadow-md',
        platformColors[platform]
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center shadow-sm">
            {icon}
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">{title}</h4>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {onRegenerate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="h-8 w-8 p-0"
              title="Regenerate"
            >
              <RefreshCw className={cn('w-3.5 h-3.5', isRegenerating && 'animate-spin')} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => isEditing ? handleSaveEdit() : setIsEditing(true)}
            className="h-8 w-8 p-0"
            title={isEditing ? 'Save' : 'Edit'}
          >
            {isEditing ? <Save className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <Textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="min-h-[120px] text-sm bg-white/60 border-white/40"
          autoFocus
        />
      ) : (
        <div className="text-sm text-foreground/85 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
          {editedContent}
        </div>
      )}

      {/* Footer — char count */}
      {charLimit && (
        <div className="mt-2 flex justify-end">
          <span className={cn('text-xs', isOverLimit ? 'text-red-500 font-medium' : 'text-muted-foreground')}>
            {charCount}/{charLimit} chars
          </span>
        </div>
      )}
    </div>
  );
};

export default ContentCard;
