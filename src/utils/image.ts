export function getPosterUrl(posterPath: string | null, size: string = "w500"): string {
  if (!posterPath) {
    return '/placeholder-poster.png';
  }
  const baseUrl = "https://image.tmdb.org/t/p/";
  return `${baseUrl}${size}${posterPath}`;
}

export function getBackdropUrl(backdropPath: string | null, size: string = "w1280"): string {
  if (!backdropPath) {
    return '/placeholder-backdrop.png';
  }
  const baseUrl = "https://image.tmdb.org/t/p/";
  return `${baseUrl}${size}${backdropPath}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}