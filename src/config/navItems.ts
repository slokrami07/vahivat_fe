// Public nav items — used on landing, about, contact pages
export const PUBLIC_NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'For Buyers', href: '/login?type=buyer' },
  { label: 'For Vendors', href: '/login?type=vendor' },
]

// These are the color configs for dark pages (landing, about, contact hero sections)
export const DARK_NAV_COLORS = {
  baseColor: '#121E36',
  pillColor: '#121E36',
  hoverBgColor: '#1B2A4A',
  hoveredPillTextColor: '#ffffff',
  pillTextColor: '#9ca3af',
}

// Color config for light sections (if PillNav is used over white background)
export const LIGHT_NAV_COLORS = {
  baseColor: '#ffffff',
  pillColor: '#f1f5f9',
  hoveredPillTextColor: '#0A0A0A',
  pillTextColor: '#374151',
}
