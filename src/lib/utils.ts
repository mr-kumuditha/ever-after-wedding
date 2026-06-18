import { format } from 'date-fns';

export function formatDate(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}

export function formatTime(date: Date): string {
  return format(date, 'h:mm a');
}

export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

export function generateGuestUrl(guestCode: string): string {
  return `${window.location.origin}/invite/${guestCode}`;
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, 'MMM d, yyyy');
}
