import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, ClipboardList, BarChart2, BookOpen, LogOut,
  Plus, Trash2, Eye, Copy, QrCode, Download, X, Menu,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from 'recharts';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { supabase } from '../lib/supabase';
import type { Guest, GuestBookEntry, AdminStats } from '../types';
import QRCodeCard from '../components/ui/QRCodeCard';
import { copyToClipboard, formatRelativeDate } from '../lib/utils';

type Tab = 'overview' | 'guests' | 'rsvps' | 'analytics' | 'guestbook';

interface RSVPEntry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  number_of_guests: number;
  attendance_status: string;
  dietary_requirements: string;
  message: string;
  submitted_at: string;
}

const GOLD = '#d4af37';
const CHART_COLORS = ['#22c55e', '#ef4444', '#eab308'];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<AdminStats>({ totalInvited: 0, totalAttending: 0, totalDeclined: 0, totalPending: 0, totalViews: 0 });
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [guestbookEntries, setGuestbookEntries] = useState<GuestBookEntry[]>([]);
  const [searchRSVP, setSearchRSVP] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showQR, setShowQR] = useState<string | null>(null);
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [newGuest, setNewGuest] = useState({ guest_code: '', full_name: '', email: '', phone: '' });

  // Auth check
  useEffect(() => {
    if (localStorage.getItem('admin_auth') !== 'true') navigate('/admin/login');
  }, [navigate]);

  const fetchAll = useCallback(async () => {
    const [gData, rData, gbData] = await Promise.all([
      supabase.from('guests').select('*').order('created_at', { ascending: false }),
      supabase.from('rsvp').select('*').order('submitted_at', { ascending: false }),
      supabase.from('guestbook').select('*').order('created_at', { ascending: false }),
    ]);
    const g = (gData.data || []) as Guest[];
    const r = (rData.data || []) as RSVPEntry[];
    setGuests(g);
    setRsvps(r);
    setGuestbookEntries((gbData.data || []) as GuestBookEntry[]);
    setStats({
      totalInvited: g.length,
      totalAttending: g.filter(x => x.rsvp_status === 'attending').length,
      totalDeclined: g.filter(x => x.rsvp_status === 'not_attending').length,
      totalPending: g.filter(x => x.rsvp_status === 'pending').length,
      totalViews: g.reduce((sum, x) => sum + (x.invitation_views || 0), 0),
    });
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const logout = () => { localStorage.removeItem('admin_auth'); navigate('/admin/login'); };

  const deleteGuest = async (id: string) => {
    if (!confirm('Delete this guest?')) return;
    await supabase.from('guests').delete().eq('id', id);
    toast.success('Guest deleted.');
    fetchAll();
  };

  const deleteGuestbook = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await supabase.from('guestbook').delete().eq('id', id);
    toast.success('Message deleted.');
    fetchAll();
  };

  const addGuest = async () => {
    if (!newGuest.guest_code || !newGuest.full_name) { toast.error('Code and name required.'); return; }
    const { error } = await supabase.from('guests').insert([newGuest]);
    if (error) { toast.error('Failed to add guest.'); return; }
    toast.success('Guest added!');
    setShowAddGuest(false);
    setNewGuest({ guest_code: '', full_name: '', email: '', phone: '' });
    fetchAll();
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rsvps);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'RSVPs');
    XLSX.writeFile(wb, 'ever-after-rsvps.xlsx');
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Guests', 'Status', 'Dietary', 'Message', 'Date'];
    const rows = rsvps.map(r => [r.full_name, r.email, r.phone, r.number_of_guests, r.attendance_status, r.dietary_requirements, r.message, r.submitted_at].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ever-after-rsvps.csv';
    a.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Ever After — RSVP Report', 14, 20);
    doc.setFontSize(11);
    doc.text('Oshani & Ransala · October 6, 2026', 14, 30);
    autoTable(doc, {
      startY: 40,
      head: [['Name', 'Status', 'Guests', 'Dietary', 'Date']],
      body: rsvps.map(r => [r.full_name, r.attendance_status, String(r.number_of_guests), r.dietary_requirements, formatRelativeDate(r.submitted_at)]),
      headStyles: { fillColor: [212, 175, 55], textColor: [10, 10, 10] },
    });
    doc.save('ever-after-rsvps.pdf');
  };

  const filteredRSVPs = rsvps.filter(r => {
    const matchSearch = !searchRSVP || r.full_name.toLowerCase().includes(searchRSVP.toLowerCase()) || r.email?.toLowerCase().includes(searchRSVP.toLowerCase());
    const matchStatus = filterStatus === 'all' || r.attendance_status === filterStatus;
    return matchSearch && matchStatus;
  });

  const pieData = [
    { name: 'Attending', value: stats.totalAttending },
    { name: 'Declined', value: stats.totalDeclined },
    { name: 'Pending', value: stats.totalPending },
  ];

  const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'guests', label: 'Guests', icon: <Users size={18} /> },
    { id: 'rsvps', label: 'RSVPs', icon: <ClipboardList size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={18} /> },
    { id: 'guestbook', label: 'Guestbook', icon: <BookOpen size={18} /> },
  ];

  const inputClass = 'px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-ivory-100 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500';
  const thClass = 'text-left font-sans text-xs tracking-widest uppercase text-gold-500 pb-2 border-b border-white/10';
  const tdClass = 'py-3 font-sans text-sm text-ivory-200 border-b border-white/5';
  const statusBadge = (s: string) => {
    const map: Record<string, string> = { attending: 'bg-green-500/20 text-green-400', not_attending: 'bg-red-500/20 text-red-400', pending: 'bg-yellow-500/20 text-yellow-400' };
    return `px-2 py-0.5 rounded-full text-xs font-medium ${map[s] || 'bg-white/10 text-white'}`;
  };

  const STAT_CARDS = [
    { label: 'Total Invited', value: stats.totalInvited, color: 'text-gold-400' },
    { label: 'Attending', value: stats.totalAttending, color: 'text-green-400' },
    { label: 'Declined', value: stats.totalDeclined, color: 'text-red-400' },
    { label: 'Pending', value: stats.totalPending, color: 'text-yellow-400' },
    { label: 'Total Views', value: stats.totalViews, color: 'text-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-ivory-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-60 bg-charcoal border-r border-white/10 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex`}>
        <div className="p-6 border-b border-white/10">
          <span className="font-script text-2xl gold-text">Ever After</span>
          <p className="font-sans text-xs text-white/40 mt-0.5 tracking-widest uppercase">Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              id={`admin-nav-${item.id}`}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-sm transition-all duration-200 ${activeTab === item.id ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl font-sans text-sm transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-charcoal/80 backdrop-blur border-b border-white/10 px-6 py-3 flex items-center justify-between">
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(s => !s)}>
            <Menu size={22} />
          </button>
          <h1 className="font-display text-lg capitalize">{activeTab}</h1>
          <span className="font-sans text-xs text-white/30">admin@everafter.com</span>
        </div>

        <div className="p-6">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {STAT_CARDS.map(s => (
                  <div key={s.label} className="glass-card p-4 text-center">
                    <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="font-sans text-xs text-white/50 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="glass-card p-4">
                <h2 className="font-display text-lg mb-4">Recent RSVPs</h2>
                <table className="w-full">
                  <thead><tr>
                    <th className={thClass}>Name</th>
                    <th className={thClass}>Status</th>
                    <th className={thClass}>Date</th>
                  </tr></thead>
                  <tbody>
                    {rsvps.slice(0, 5).map(r => (
                      <tr key={r.id}>
                        <td className={tdClass}>{r.full_name}</td>
                        <td className={tdClass}><span className={statusBadge(r.attendance_status)}>{r.attendance_status}</span></td>
                        <td className={tdClass}>{formatRelativeDate(r.submitted_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* GUESTS */}
          {activeTab === 'guests' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="font-sans text-sm text-white/50">{guests.length} guests total</p>
                <button id="add-guest-btn" onClick={() => setShowAddGuest(true)} className="gold-btn-solid text-xs px-4 py-2 flex items-center gap-2">
                  <Plus size={14} /> Add Guest
                </button>
              </div>
              <div className="glass-card p-4 overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead><tr>
                    <th className={thClass}>Code</th>
                    <th className={thClass}>Name</th>
                    <th className={thClass}>Email</th>
                    <th className={thClass}>Views</th>
                    <th className={thClass}>Status</th>
                    <th className={thClass}>Actions</th>
                  </tr></thead>
                  <tbody>
                    {guests.map(g => (
                      <tr key={g.id}>
                        <td className={tdClass}><code className="text-gold-400 text-xs">{g.guest_code}</code></td>
                        <td className={tdClass}>{g.full_name}</td>
                        <td className={`${tdClass} text-xs text-white/50`}>{g.email || '—'}</td>
                        <td className={tdClass}>{g.invitation_views}</td>
                        <td className={tdClass}><span className={statusBadge(g.rsvp_status)}>{g.rsvp_status}</span></td>
                        <td className={tdClass}>
                          <div className="flex gap-2">
                            <button onClick={() => window.open(`/invite/${g.guest_code}`, '_blank')} className="p-1 hover:text-gold-400 transition-colors" title="View"><Eye size={14} /></button>
                            <button onClick={() => { copyToClipboard(`${window.location.origin}/invite/${g.guest_code}`); toast.success('Link copied!'); }} className="p-1 hover:text-gold-400 transition-colors" title="Copy Link"><Copy size={14} /></button>
                            <button onClick={() => setShowQR(g.guest_code)} className="p-1 hover:text-gold-400 transition-colors" title="QR Code"><QrCode size={14} /></button>
                            <button onClick={() => deleteGuest(g.id)} className="p-1 hover:text-red-400 transition-colors" title="Delete"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* RSVPs */}
          {activeTab === 'rsvps' && (
            <div>
              <div className="flex flex-wrap gap-3 mb-4">
                <input value={searchRSVP} onChange={e => setSearchRSVP(e.target.value)} placeholder="Search name or email..." className={`${inputClass} flex-1 min-w-[200px]`} />
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className={inputClass}>
                  <option value="all">All Status</option>
                  <option value="attending">Attending</option>
                  <option value="not_attending">Not Attending</option>
                </select>
                <button onClick={exportExcel} className="gold-btn text-xs px-3 py-2 flex items-center gap-1"><Download size={12} />Excel</button>
                <button onClick={exportCSV} className="gold-btn text-xs px-3 py-2 flex items-center gap-1"><Download size={12} />CSV</button>
                <button onClick={exportPDF} className="gold-btn-solid text-xs px-3 py-2 flex items-center gap-1"><Download size={12} />PDF</button>
              </div>
              <div className="glass-card p-4 overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead><tr>
                    <th className={thClass}>Name</th>
                    <th className={thClass}>Email</th>
                    <th className={thClass}>Guests</th>
                    <th className={thClass}>Status</th>
                    <th className={thClass}>Dietary</th>
                    <th className={thClass}>Date</th>
                  </tr></thead>
                  <tbody>
                    {filteredRSVPs.map(r => (
                      <tr key={r.id}>
                        <td className={tdClass}>{r.full_name}</td>
                        <td className={`${tdClass} text-xs text-white/50`}>{r.email}</td>
                        <td className={tdClass}>{r.number_of_guests}</td>
                        <td className={tdClass}><span className={statusBadge(r.attendance_status)}>{r.attendance_status}</span></td>
                        <td className={`${tdClass} text-xs`}>{r.dietary_requirements}</td>
                        <td className={`${tdClass} text-xs text-white/50`}>{formatRelativeDate(r.submitted_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredRSVPs.length === 0 && <p className="text-center text-white/30 py-8 font-sans text-sm">No RSVPs found.</p>}
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg mb-4">Attendance Breakdown</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                        {pieData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #d4af37', borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg mb-4">Guest Invitation Views</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={guests.slice(0, 10).map(g => ({ name: g.full_name.split(' ')[0], views: g.invitation_views }))}>
                      <XAxis dataKey="name" stroke={GOLD} tick={{ fontSize: 10 }} />
                      <YAxis stroke={GOLD} tick={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #d4af37', borderRadius: 8 }} />
                      <Bar dataKey="views" fill={GOLD} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-display text-lg mb-4">RSVP Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={rsvps.slice(0, 20).map((_r, i) => ({ idx: i + 1, count: i + 1 }))}>
                    <XAxis dataKey="idx" stroke={GOLD} tick={{ fontSize: 10 }} />
                    <YAxis stroke={GOLD} tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #d4af37', borderRadius: 8 }} />
                    <Line type="monotone" dataKey="count" stroke={GOLD} dot={false} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* GUESTBOOK */}
          {activeTab === 'guestbook' && (
            <div>
              <p className="font-sans text-sm text-white/50 mb-4">{guestbookEntries.length} messages</p>
              <div className="glass-card p-4 overflow-x-auto">
                <table className="w-full">
                  <thead><tr>
                    <th className={thClass}>Author</th>
                    <th className={thClass}>Message</th>
                    <th className={thClass}>Date</th>
                    <th className={thClass}>Action</th>
                  </tr></thead>
                  <tbody>
                    {guestbookEntries.map(e => (
                      <tr key={e.id}>
                        <td className={`${tdClass} font-medium text-gold-400`}>{e.author_name}</td>
                        <td className={`${tdClass} max-w-xs text-xs opacity-70 truncate`}>{e.message}</td>
                        <td className={`${tdClass} text-xs text-white/40`}>{formatRelativeDate(e.created_at)}</td>
                        <td className={tdClass}>
                          <button onClick={() => deleteGuestbook(e.id)} className="p-1 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowQR(null)}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={e => e.stopPropagation()}>
              <div className="relative">
                <button onClick={() => setShowQR(null)} className="absolute -top-3 -right-3 w-8 h-8 bg-obsidian rounded-full flex items-center justify-center border border-white/20 hover:text-gold-400 z-10"><X size={14} /></button>
                <QRCodeCard guestCode={showQR} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Guest Modal */}
      <AnimatePresence>
        {showAddGuest && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddGuest(false)}>
            <motion.div className="glass-card p-6 w-full max-w-sm" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()}>
              <h3 className="font-display text-xl mb-4">Add New Guest</h3>
              {(['guest_code', 'full_name', 'email', 'phone'] as const).map(field => (
                <div key={field} className="mb-3">
                  <label className="block font-sans text-xs tracking-widest uppercase text-gold-500 mb-1">{field.replace('_', ' ')}</label>
                  <input value={newGuest[field]} onChange={e => setNewGuest(n => ({ ...n, [field]: e.target.value }))} className={`${inputClass} w-full`} placeholder={field === 'guest_code' ? 'e.g. NEW001' : ''} />
                </div>
              ))}
              <div className="flex gap-3 mt-4">
                <button onClick={() => setShowAddGuest(false)} className="flex-1 gold-btn text-xs py-2">Cancel</button>
                <button onClick={addGuest} className="flex-1 gold-btn-solid text-xs py-2">Add Guest</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
