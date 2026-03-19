import { useState } from 'react';
import { Copy, Check, Pencil, Trash2, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import type { ContentItem } from '@/stores/contentStore';

const TYPE_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  instagram: { label: 'Instagram', bg: 'bg-pink-100', text: 'text-pink-800' },
  facebook: { label: 'Facebook', bg: 'bg-blue-100', text: 'text-blue-800' },
  email: { label: 'Email', bg: 'bg-orange-100', text: 'text-orange-800' },
  sms: { label: 'SMS', bg: 'bg-emerald-100', text: 'text-emerald-800' },
  calendar: { label: 'Calendar', bg: 'bg-purple-100', text: 'text-purple-800' },
};

interface ContentCardProps {
  item: ContentItem;
  onUpdate: (id: string, updates: Partial<ContentItem>) => void;
  onDelete: (id: string) => void;
}

const ContentCard = ({ item, onUpdate, onDelete }: ContentCardProps) => {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(item.content);
  const [editSubject, setEditSubject] = useState(item.subject ?? '');
  const [copied, setCopied] = useState(false);

  const style = TYPE_STYLES[item.contentType] ?? TYPE_STYLES.instagram;

  const handleCopy = async () => {
    const text = item.subject ? `Subject: ${item.subject}\n\n${item.content}` : item.content;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onUpdate(item.id, {
      content: editContent,
      ...(item.contentType === 'email' ? { subject: editSubject } : {}),
    });
    setEditing(false);
    toast.success('Content updated');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
            {style.label}
          </span>
          <span className="text-xs text-muted-foreground">{item.tripName}</span>
        </div>
        <span className="text-xs text-muted-foreground shrink-0">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>

      {editing ? (
        <div className="space-y-2">
          {item.contentType === 'email' && (
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={editSubject}
              onChange={(e) => setEditSubject(e.target.value)}
              placeholder="Subject line"
            />
          )}
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-[120px] text-sm"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} className="gap-1.5">
              <Save className="w-3.5 h-3.5" /> Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(false)} className="gap-1.5">
              <X className="w-3.5 h-3.5" /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          {item.subject && (
            <p className="text-sm font-semibold text-foreground">
              Subject: {item.subject}
            </p>
          )}
          <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
            {item.content}
          </p>
          <div className="flex gap-2 pt-1">
            <Button size="sm" variant="outline" onClick={handleCopy} className="gap-1.5">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(true)} className="gap-1.5">
              <Pencil className="w-3.5 h-3.5" /> Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(item.id)}
              className="gap-1.5 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentCard;
