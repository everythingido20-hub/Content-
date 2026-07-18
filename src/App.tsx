import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// Safe programmatic VideoPlayer component to bypass React muted hydration bug and enable robust autoplay
const VideoPlayer = ({ src, className, controls = false }: { src: string; className?: string; controls?: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(src);

  // Sync state with the prop when it changes (essential for dynamic video selections)
  useEffect(() => {
    setVideoSrc(src);
  }, [src]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => {
        console.warn("Autoplay block prevented:", err);
      });
    }
  }, [videoSrc]);

  const handleError = () => {
    // If the mixkit URL fails to load (e.g. due to CORS or hotlinking restriction), fallback to a highly reliable video CDN
    if (videoSrc && videoSrc !== "https://vjs.zencdn.net/v/oceans.mp4") {
      setVideoSrc("https://vjs.zencdn.net/v/oceans.mp4");
    }
  };

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      controls={controls}
      preload="auto"
      onError={handleError}
    />
  );
};
import { 
  Search, 
  Send, 
  Play, 
  Sparkles, 
  Filter, 
  Layers, 
  Sliders, 
  Music, 
  Film, 
  Crown, 
  CheckCircle2, 
  Star, 
  Eye, 
  ArrowUp, 
  X, 
  Check,
  Lock,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Zap,
  Clock,
  ExternalLink,
  Video,
  Upload,
  Link2,
  Trash2
} from "lucide-react";

// Define the Pack interface
interface Pack {
  id: string;
  title: string;
  category: string;
  description: string;
  specs: string[];
  gradient: string;
  borderColor: string;
  imageUrl: string;
  price: string;
}

// 6 Categories corresponding to beautiful digital assets
const categories = [
  "Lightroom Presets",
  "Cinematic LUTs",
  "Video Packs",
  "Sound FX",
  "Overlays",
  "VIP Packs"
];

// Curated dark, premium Unsplash images matching the categories
const categoryImages = [
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400&auto=format&fit=crop", // Lightroom Presets (photography vibe)
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop", // Cinematic LUTs (film slate)
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&auto=format&fit=crop", // Video Packs (movie production)
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&auto=format&fit=crop", // Sound FX (mixing board)
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop", // Overlays (lens flares/neon glow)
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop"  // VIP Packs (luxurious liquid red-black)
];

// Tailwind border colors for active status
const borderColors = [
  "group-hover:border-red-600/60",
  "group-hover:border-purple-600/60",
  "group-hover:border-rose-600/60",
  "group-hover:border-amber-600/60",
  "group-hover:border-emerald-600/60",
  "group-hover:border-blue-600/60"
];

const gradients = [
  "from-red-950/30 via-neutral-900 to-black",
  "from-purple-950/30 via-neutral-900 to-black",
  "from-rose-950/30 via-neutral-900 to-black",
  "from-amber-950/30 via-neutral-900 to-black",
  "from-emerald-950/30 via-neutral-900 to-black",
  "from-blue-950/30 via-neutral-900 to-black",
];

// Generate 30 Packs
const allPacks: Pack[] = Array.from({ length: 30 }, (_, index) => {
  const idNum = index + 1;
  const idStr = idNum < 10 ? `0${idNum}` : `${idNum}`;
  const categoryIndex = index % categories.length;
  let category = categories[categoryIndex];
  
  // Custom override for Pack #01 (Família incrível)
  const isPack01 = idStr === "01";
  if (isPack01) {
    category = "Video Packs";
  }

  const gradient = gradients[categories.indexOf(category)];
  const borderColor = borderColors[categories.indexOf(category)];
  let imageUrl = categoryImages[categories.indexOf(category)];

  if (isPack01) {
    imageUrl = "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=400&auto=format&fit=crop";
  }

  // Tailored features for realistic product visual
  let specs = ["VIP Support", "Immediate Access", "Commercial Use"];
  
  // Distribute prices beautifully between $15, $25, $35, $45, $50, $75, $99 etc.
  const samplePrices = [15, 25, 35, 45, 50, 75, 99];
  const basePrice = samplePrices[(categoryIndex + index) % samplePrices.length];
  let price = `$ ${basePrice}`;

  if (isPack01) {
    specs = ["High Resolution Video", "Professional Format", "Free Commercial Use"];
    price = "$ 35";
  } else if (category === "Lightroom Presets") {
    specs = ["55 Presets Included", "DNG & XMP Format", "Mobile & Desktop"];
  } else if (category === "Cinematic LUTs") {
    specs = ["35 Professional Colors", "Rec.709 & Log Support", "For Premiere & Resolve"];
  } else if (category === "Video Packs") {
    specs = ["4K Ultra HD Resolution", "60 FPS Free Clips", "Transitions Included"];
  } else if (category === "Sound FX") {
    specs = ["Studio WAV Quality", "150+ Sound Effects", "Mixed & Mastered"];
  } else if (category === "Overlays") {
    specs = ["Black/Transparent Background", "Easy Drag & Drop", "4K Premium Quality"];
  } else if (category === "VIP Packs") {
    specs = ["Lifetime Private Access", "Monthly Updates", "24/7 Specialized Support"];
  }

  return {
    id: idStr,
    title: isPack01 ? "Amazing Family" : `Pack #${idStr}`,
    category: category,
    description: isPack01 ? "United family." : "Pack description here - exclusive content and hand-picked material to elevate the level of your digital creations and productions.",
    specs: specs,
    gradient: gradient,
    borderColor: borderColor,
    imageUrl: imageUrl,
    price: price
  };
});

// Mock notification ticker list
const purchaseNotificationTemplates = [
  "User @matheus_v... acquired Pack #07 via Telegram!",
  "User @carla_silva... bought Pack #18 with VIP Support!",
  "User @bruno_designer... unlocked Pack #01!",
  "User @felipe_prod... just claimed the VIP Combo!",
  "User @ana_clara... secured Pack #12 for Lightroom!",
  "User @diego_editor... downloaded Cinematic LUTs Pack #15!",
  "User @julia_m... acquired Overlays Premium Pack #22!"
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeNotification, setActiveNotification] = useState<string>("");
  const [selectedPreviewPack, setSelectedPreviewPack] = useState<Pack | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedLinkIndex, setCopiedLinkIndex] = useState<string | null>(null);

  // Helper to read statically baked config (for when this file is exported/compiled as static HTML)
  const getBakedConfig = (key: "videos" | "descriptions" | "prices" | "titles") => {
    try {
      const element = document.getElementById("custom-static-config");
      if (element) {
        const config = JSON.parse(element.textContent || "{}");
        if (config[key]) return config[key];
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  // State to check if editing has been permanently disabled in the exported HTML
  const [isEditingBlockedInBaked] = useState<boolean>(() => {
    try {
      const element = document.getElementById("custom-static-config");
      if (element) {
        const config = JSON.parse(element.textContent || "{}");
        return config.disableEditing === true;
      }
    } catch (e) {}
    return false;
  });

  // Admin and Password States
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem("admin_session") === "active";
    } catch (e) {
      return false;
    }
  });
  const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");
  const [disableEditingInExport, setDisableEditingInExport] = useState(true);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Custom videos state with persistence
  const [packVideos, setPackVideos] = useState<Record<string, string>>(() => {
    const baked = getBakedConfig("videos");
    if (baked) return baked;
    try {
      const saved = localStorage.getItem("custom_pack_videos");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return {
      "01": "https://assets.mixkit.co/videos/preview/mixkit-happy-family-smiling-and-waving-at-camera-34135-large.mp4"
    };
  });

  // Custom descriptions state with persistence
  const [packDescriptions, setPackDescriptions] = useState<Record<string, string>>(() => {
    const baked = getBakedConfig("descriptions");
    if (baked) return baked;
    try {
      const saved = localStorage.getItem("custom_pack_descriptions");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  // Custom titles state with persistence
  const [packTitles, setPackTitles] = useState<Record<string, string>>(() => {
    const baked = getBakedConfig("titles");
    if (baked) return baked;
    try {
      const saved = localStorage.getItem("custom_pack_titles");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  // Custom prices state with persistence
  const [packPrices, setPackPrices] = useState<Record<string, string>>(() => {
    const baked = getBakedConfig("prices");
    if (baked) return baked;
    try {
      const saved = localStorage.getItem("custom_pack_prices");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  const [editingPack, setEditingPack] = useState<Pack | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState("");
  const [customTitleInput, setCustomTitleInput] = useState("");
  const [customDescriptionInput, setCustomDescriptionInput] = useState("");
  const [customPriceInput, setCustomPriceInput] = useState("");

  // Ref to always have the latest customized titles inside the interval
  const packTitlesRef = useRef(packTitles);
  useEffect(() => {
    packTitlesRef.current = packTitles;
  }, [packTitles]);

  // Advanced video state handlers for flawless local uploads vs online links
  const [videoSourceType, setVideoSourceType] = useState<"default" | "local" | "url">("default");
  const [localVideoFileName, setLocalVideoFileName] = useState("");
  const [localVideoSizeStatus, setLocalVideoSizeStatus] = useState<"none" | "permanent" | "temp">("none");

  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (adminPasswordInput === "8080") {
      setIsAdmin(true);
      sessionStorage.setItem("admin_session", "active");
      setShowAdminPasswordModal(false);
      setAdminPasswordInput("");
      setAdminPasswordError("");
    } else {
      setAdminPasswordError("Incorrect password!");
    }
  };

  const handleExportHtml = () => {
    try {
      const configPayload = {
        videos: packVideos,
        titles: packTitles,
        descriptions: packDescriptions,
        prices: packPrices,
        disableEditing: disableEditingInExport
      };

      fetch("/content_store.html")
        .then(response => {
          if (!response.ok) {
            throw new Error("Could not find template file content_store.html.");
          }
          return response.text();
        })
        .then(htmlContent => {
          const configScriptTag = `\n  <script id="custom-static-config" type="application/json">${JSON.stringify(configPayload, null, 2)}</script>\n`;
          let modifiedHtml = htmlContent;
          if (htmlContent.includes('<script id="custom-static-config" type="application/json">')) {
            modifiedHtml = htmlContent.replace(/<script id="custom-static-config" type="application\/json">[\s\S]*?<\/script>/, configScriptTag);
          } else {
            modifiedHtml = htmlContent.replace('<div id="root"></div>', `<div id="root"></div>${configScriptTag}`);
          }

          const blob = new Blob([modifiedHtml], { type: "text/html;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "index.html";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          setExportSuccess(true);
          setTimeout(() => setExportSuccess(false), 5000);
        })
        .catch(err => {
          console.error(err);
          alert("Error exporting file: " + err.message);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const savePackDetails = (packId: string, url: string, title: string, description: string, price: string) => {
    // Save video
    const updatedVideos = { ...packVideos };
    if (url.trim()) {
      updatedVideos[packId] = url.trim();
    } else {
      delete updatedVideos[packId];
    }
    setPackVideos(updatedVideos);

    // Save title
    const updatedTitles = { ...packTitles };
    if (title.trim()) {
      updatedTitles[packId] = title.trim();
    } else {
      delete updatedTitles[packId];
    }
    setPackTitles(updatedTitles);

    // Save description
    const updatedDescriptions = { ...packDescriptions };
    if (description.trim()) {
      updatedDescriptions[packId] = description.trim();
    } else {
      delete updatedDescriptions[packId];
    }
    setPackDescriptions(updatedDescriptions);

    // Save price
    const updatedPrices = { ...packPrices };
    if (price.trim()) {
      updatedPrices[packId] = price.trim();
    } else {
      delete updatedPrices[packId];
    }
    setPackPrices(updatedPrices);

    try {
      localStorage.setItem("custom_pack_videos", JSON.stringify(updatedVideos));
      localStorage.setItem("custom_pack_titles", JSON.stringify(updatedTitles));
      localStorage.setItem("custom_pack_descriptions", JSON.stringify(updatedDescriptions));
      localStorage.setItem("custom_pack_prices", JSON.stringify(updatedPrices));
    } catch (e) {
      console.error(e);
    }
  };

  const resetPackDetails = (packId: string) => {
    const updatedVideos = { ...packVideos };
    const updatedTitles = { ...packTitles };
    const updatedDescriptions = { ...packDescriptions };
    const updatedPrices = { ...packPrices };

    delete updatedVideos[packId];
    delete updatedTitles[packId];
    delete updatedDescriptions[packId];
    delete updatedPrices[packId];

    setPackVideos(updatedVideos);
    setPackTitles(updatedTitles);
    setPackDescriptions(updatedDescriptions);
    setPackPrices(updatedPrices);

    try {
      localStorage.setItem("custom_pack_videos", JSON.stringify(updatedVideos));
      localStorage.setItem("custom_pack_titles", JSON.stringify(updatedTitles));
      localStorage.setItem("custom_pack_descriptions", JSON.stringify(updatedDescriptions));
      localStorage.setItem("custom_pack_prices", JSON.stringify(updatedPrices));
    } catch (e) {
      console.error(e);
    }
  };

  // Dynamic Ticker Simulator
  useEffect(() => {
    const showRandomNotification = () => {
      const users = ["@matheus_v", "@carla_silva", "@bruno_designer", "@felipe_prod", "@ana_clara", "@diego_editor", "@julia_m", "@lucas_k", "@mari_s", "@gabs_design"];
      const actions = ["acquired", "bought", "unlocked", "secured", "downloaded"];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      const randomPackIndex = Math.floor(Math.random() * allPacks.length);
      const pack = allPacks[randomPackIndex];
      const title = packTitlesRef.current[pack.id] || pack.title;
      
      let notification = `User ${randomUser}... ${randomAction} ${title}!`;
      if (Math.random() > 0.5) {
        const suffixes = [" via Telegram!", " with VIP Support!", " instantly!", "!"];
        notification += suffixes[Math.floor(Math.random() * suffixes.length)];
      }
      setActiveNotification(notification);
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setActiveNotification("");
      }, 5000);
    };

    // Initial trigger
    const initialTimeout = setTimeout(showRandomNotification, 3000);
    
    // Interval trigger
    const interval = setInterval(showRandomNotification, 14000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filter packs based on selection & search
  const filteredPacks = allPacks.filter((pack) => {
    const matchesCategory = selectedCategory === "All" || pack.category === selectedCategory;
    const currentTitle = packTitles[pack.id] || pack.title;
    const currentDesc = packDescriptions[pack.id] || pack.description;
    const matchesSearch = 
      currentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currentDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = (packId: string) => {
    const dummyUrl = `${window.location.origin}/#pack-${packId}`;
    navigator.clipboard.writeText(dummyUrl);
    setCopiedLinkIndex(packId);
    setTimeout(() => setCopiedLinkIndex(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Lightroom Presets":
        return <Sliders className="w-4 h-4 text-red-500" />;
      case "Cinematic LUTs":
        return <Film className="w-4 h-4 text-purple-500" />;
      case "Video Packs":
        return <Play className="w-4 h-4 text-rose-500" />;
      case "Sound FX":
        return <Music className="w-4 h-4 text-amber-500" />;
      case "Overlays":
        return <Layers className="w-4 h-4 text-emerald-500" />;
      case "VIP Packs":
        return <Crown className="w-4 h-4 text-yellow-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col selection:bg-red-600 selection:text-white" id="main-container">
      
      {/* Dynamic Live Ticker / Global Banner */}
      <div className="w-full bg-red-950/40 border-b border-red-900/40 py-2.5 px-4 overflow-hidden relative" id="live-ticker">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-red-500 font-bold uppercase tracking-wider">LIVE STATUS:</span>
            <div className="h-5 overflow-hidden relative min-w-[280px] sm:min-w-[400px]">
              <AnimatePresence mode="wait">
                {activeNotification ? (
                  <motion.span
                    key={activeNotification}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute text-gray-300 font-sans"
                  >
                    {activeNotification}
                  </motion.span>
                ) : (
                  <span className="absolute text-gray-400 font-sans">
                    🔥 VIP Discount active for all purchases completed today via Telegram!
                  </span>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-red-500" /> Instant Delivery
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" /> Secure Download
            </span>
          </div>
        </div>
      </div>

      {/* Hero / Navigation Section - Sophisticated Dark Layout */}
      <header className="w-full bg-[#0a0a0a] border-b border-[#222] py-6 px-4 md:px-10 flex flex-col md:flex-row justify-between items-start md:items-center relative" id="header">
        <div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#ff0000] text-2xl sm:text-3xl font-black uppercase tracking-[2px] font-sans"
          >
            Content Store
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#888] text-[11px] sm:text-xs uppercase tracking-[1px] font-medium mt-1"
          >
            Access to exclusive premium content packages
          </motion.p>
        </div>

        {/* Navigation Links - Smooth Scrolling */}
        <nav className="flex items-center gap-6 my-4 md:my-0 text-[10px] font-bold uppercase tracking-[1.5px] text-neutral-400">
          <button 
            onClick={() => scrollToSection("controls-section")} 
            className="hover:text-[#ff0000] cursor-pointer transition-colors duration-200"
          >
            Catalog
          </button>
          <button 
            onClick={() => scrollToSection("trust-and-faq")} 
            className="hover:text-[#ff0000] cursor-pointer transition-colors duration-200"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection("trust-and-faq")} 
            className="hover:text-[#ff0000] cursor-pointer transition-colors duration-200"
          >
            VIP Support
          </button>
        </nav>

        <div className="flex items-center gap-4">
          {!isEditingBlockedInBaked && (
            isAdmin ? (
              <button
                onClick={() => {
                  setIsAdmin(false);
                  sessionStorage.removeItem("admin_session");
                }}
                className="text-[10px] bg-red-950/40 hover:bg-red-900/40 text-red-500 font-mono font-bold py-1 px-2.5 rounded border border-red-900/40 uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                title="Exit Edit Mode"
              >
                <Lock className="w-3.5 h-3.5 text-red-500 animate-pulse" /> Logout Admin
              </button>
            ) : (
              <button
                onClick={() => setShowAdminPasswordModal(true)}
                className="text-[10px] text-neutral-500 hover:text-white font-mono uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                title="Access edit panel"
              >
                <Lock className="w-3.5 h-3.5 text-neutral-600" /> Admin Panel
              </button>
            )
          )}
          <div className="text-xs text-[#ff0000] font-bold tracking-widest uppercase font-mono">
            EXCLUSIVE • 2026
          </div>
        </div>
      </header>

      {/* Admin Panel Banner - displays when Admin is active */}
      {isAdmin && !isEditingBlockedInBaked && (
        <div className="w-full bg-[#111] border-b border-red-900/40 py-3.5 px-4 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4" id="admin-panel-bar">
          <div className="flex items-center gap-2.5 text-left">
            <div className="p-1.5 bg-red-950/80 rounded border border-red-900/50">
              <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">You are in Edit Mode (Admin)</h4>
              <p className="text-[10px] text-neutral-400 font-sans">Hover or tap on cards to customize videos, prices, and descriptions.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <label className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono cursor-pointer hover:text-white transition-colors">
              <input 
                type="checkbox" 
                checked={disableEditingInExport}
                onChange={(e) => setDisableEditingInExport(e.target.checked)}
                className="rounded bg-neutral-900 border-neutral-800 text-red-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span>Lock Editing on Export</span>
            </label>

            <button
              onClick={handleExportHtml}
              className="bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-[10px] py-1.5 px-3 rounded-[2px] uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-red-950/60 cursor-pointer"
              title="Download ready website with all your customizations saved permanently!"
            >
              <Upload className="w-3.5 h-3.5" /> Export Ready HTML
            </button>
          </div>
        </div>
      )}

      {/* Export Success Message Banner */}
      {exportSuccess && (
        <div className="w-full bg-emerald-950/60 border-b border-emerald-900/40 py-3 px-4 text-center text-xs text-emerald-400 font-medium font-mono animate-fade-in">
          🎉 Success! Your index.html file has been downloaded with all customizations saved permanently!
        </div>
      )}

      {/* Intro Short Section */}
      <section className="w-full bg-[#0d0d0d] border-b border-[#222] py-3.5 px-4 md:px-10 flex items-center justify-between" id="intro-section">
        <h2 className="text-xs sm:text-sm font-light text-[#ccc] tracking-[0.5px]">
          Explore our samples and choose your favorite package.
        </h2>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
          <Crown className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>DIRECT SUPPORT ACTIVE</span>
        </div>
      </section>

      {/* Main Interactive Controls: Search Bar */}
      <section className="max-w-2xl mx-auto w-full px-4 mb-10 mt-6" id="controls-section">
        <div className="bg-[#121212] border border-[#1f1f1f] p-4 rounded-[2px] shadow-xl">
          {/* Search Input */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="SEARCH PACK..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-[#1f1f1f] focus:border-[#ff0000] rounded-[2px] py-2.5 px-4 pl-10 text-[10px] text-gray-200 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-[#ff0000] uppercase tracking-wider transition-all font-mono"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-600" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-neutral-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Summary */}
        <div className="flex items-center justify-between mt-4 px-1 text-xs text-gray-500">
          <div>
            Showing <span className="text-gray-300 font-bold">{filteredPacks.length}</span> of <span className="text-gray-300 font-bold">30</span> premium packages
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-red-500 hover:text-red-400 font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>
      </section>

      {/* Grid responsiva com os 30 cards */}
      <main className="max-w-7xl mx-auto w-full px-4 mb-24 flex-grow" id="grid-section">
        {filteredPacks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredPacks.map((pack) => {
              // Dynamic message for telegram query including pack name, description and price
              const packTitle = packTitles[pack.id] || pack.title;
              const packDesc = packDescriptions[pack.id] || pack.description;
              const packPrice = packPrices[pack.id] || pack.price;
              const telegramMessageText = `Hello! I would like to purchase the following pack:

📦 Pack: ${packTitle} (ID: ${pack.id})
📝 Description: ${packDesc}
💰 Price: ${packPrice}`;
              const telegramMessage = encodeURIComponent(telegramMessageText);
              const telegramLink = `https://t.me/sisjujd?text=${telegramMessage}`;

              return (
                <motion.div
                  key={pack.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-[#121212] border border-[#1f1f1f] rounded-[2px] overflow-hidden hover:border-[#ff0000] flex flex-col justify-between transition-colors duration-200 relative"
                  id={`pack-${pack.id}`}
                >
                  
                  {/* Card Preview Area - Sophisticated Dark Preset */}
                  <div 
                    onClick={() => setSelectedPreviewPack(pack)}
                    className="relative h-[110px] w-full overflow-hidden bg-neutral-950 border-b border-[#1f1f1f] flex items-center justify-center cursor-pointer"
                    title="Click to view details"
                  >
                    {packVideos[pack.id] ? (
                      <VideoPlayer 
                        src={packVideos[pack.id]}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        {/* Background visual asset image under extremely low opacity */}
                        <img 
                          src={pack.imageUrl} 
                          alt={`Preview of ${pack.title}`}
                          className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300 filter grayscale"
                          referrerPolicy="no-referrer"
                        />

                        {/* Centered PREVIEW label watermark */}
                        <div className="relative z-10 text-[10px] font-bold text-neutral-600 group-hover:text-[#ff0000] transition-colors tracking-[2px] uppercase font-mono">
                          PREVIEW
                        </div>
                      </>
                    )}

                    {/* Button to assign custom details */}
                    {isAdmin && !isEditingBlockedInBaked && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPack(pack);
                          const savedVideo = packVideos[pack.id] || "";
                          setCustomUrlInput(savedVideo);
                          setCustomTitleInput(packTitles[pack.id] || pack.title);
                          setCustomDescriptionInput(packDescriptions[pack.id] || pack.description);
                          setCustomPriceInput(packPrices[pack.id] || pack.price);

                          // Initialize custom video source states properly
                          if (!savedVideo) {
                            setVideoSourceType("default");
                            setLocalVideoFileName("");
                            setLocalVideoSizeStatus("none");
                          } else if (savedVideo.startsWith("data:") || savedVideo.startsWith("blob:")) {
                            setVideoSourceType("local");
                            setLocalVideoFileName(savedVideo.startsWith("data:") ? "video_salvo_permanente.mp4" : "video_salvo_sessao.mp4");
                            setLocalVideoSizeStatus(savedVideo.startsWith("data:") ? "permanent" : "temp");
                          } else {
                            setVideoSourceType("url");
                            setLocalVideoFileName("");
                            setLocalVideoSizeStatus("none");
                          }
                        }}
                        className="absolute bottom-1.5 left-1.5 z-20 p-1 bg-black/80 hover:bg-[#ff0000] border border-neutral-800 text-neutral-400 hover:text-white rounded-[1px] transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[9px] font-mono cursor-pointer"
                        title="Customize card (Video, Description and Price)"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>EDIT CARD</span>
                      </button>
                    )}

                    {/* Meta badges inside preview */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                      <span className="bg-[#ff0000] text-white text-[8px] font-mono font-bold uppercase px-1 py-0.5 rounded-[1px]">
                        HOT
                      </span>
                      <span className="bg-black/80 text-neutral-400 text-[8px] font-mono px-1 py-0.5 rounded-[1px]">
                        {packPrices[pack.id] || pack.price}
                      </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-3 flex flex-col flex-grow">
                    
                    {/* Header line of the info section */}
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-sans font-bold text-[11px] text-white uppercase tracking-wider group-hover:text-[#ff0000] transition-colors">
                        {packTitles[pack.id] || pack.title}
                      </h3>
                    </div>

                    {/* Description - literal placeholder styled very cleanly */}
                    <p className="text-neutral-400 text-[10px] line-clamp-4 leading-relaxed flex-grow">
                      {packDescriptions[pack.id] || pack.description}
                    </p>
                  </div>

                  {/* Actions Section */}
                  <div className="p-3 pt-0 space-y-1.5 mt-auto bg-neutral-950/20">
                    
                    {/* Action Button: Red, attention-grabbing, 2px rounded */}
                    <a
                      href={telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#ff0000] hover:bg-[#cc0000] active:scale-95 text-white font-bold text-[10px] py-1.5 px-2 rounded-[2px] text-center uppercase tracking-wider transition-all"
                    >
                      I want this Pack - {packPrices[pack.id] || pack.price}
                    </a>

                    {/* Extra action controls: share / preview click */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedPreviewPack(pack)}
                        className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-500 hover:text-white text-[8px] font-medium py-1 px-1 rounded-[1px] transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-2.5 h-2.5" /> Details
                      </button>
                      <button
                        onClick={() => handleShare(pack.id)}
                        className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-500 hover:text-white text-[8px] font-medium py-1 px-1 rounded-[1px] transition-colors flex items-center justify-center gap-1"
                      >
                        {copiedLinkIndex === pack.id ? (
                          <>
                            <Check className="w-2.5 h-2.5 text-emerald-500" /> Copied
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-2.5 h-2.5" /> Link
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-neutral-900/30 border border-neutral-800/60 rounded-2xl max-w-lg mx-auto">
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-lg text-white mb-1">No packages found</h3>
            <p className="text-gray-400 text-sm mb-6">
              We couldn't find any results matching "{searchQuery}" in the selected category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-medium text-xs px-4 py-2 rounded-lg transition-colors"
            >
              Reset search
            </button>
          </div>
        )}
      </main>

      {/* Trust factors, guarantee & process instructions */}
      <section className="bg-neutral-950 border-t border-neutral-900 py-16 px-4" id="trust-and-faq">
        <div className="max-w-7xl mx-auto">
          
          {/* Top layout grid: How it works */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">How to Purchase Your Pack</h2>
            <p className="text-gray-400 text-sm">Simple, direct, and 100% humanized process via Telegram</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#121212] border border-neutral-800 p-6 rounded-xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 font-mono font-black">
                01
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Choose the Pack</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Explore the 30 packs available in our showcase, and analyze the price specifications and premium content.
                </p>
              </div>
            </div>

            <div className="bg-[#121212] border border-neutral-800 p-6 rounded-xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 font-mono font-black">
                02
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Start Conversation</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Click the "I want this Pack" button. You will be redirected to Telegram with the exact code of your selected package prefilled.
                </p>
              </div>
            </div>

            <div className="bg-[#121212] border border-neutral-800 p-6 rounded-xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 font-mono font-black">
                03
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Receive Instantly</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Our team will provide simplified payment details. Once confirmed, your official download links will be sent instantly!
                </p>
              </div>
            </div>
          </div>

          {/* Secure details layout section */}
          <div className="border-t border-neutral-900 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-red-500 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>GUARANTEED QUALITY & SECURITY</span>
              </div>
              <h3 className="font-display font-bold text-3xl text-white mb-4">
                Verified virus-free files, updated constantly
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                All digital content packages are stored on private high-speed servers (Google Drive and Mega.nz), ensuring extremely fast download speeds and maximum connection stability.
              </p>
              
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-gray-300 font-medium">Dedicated high-speed servers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-gray-300 font-medium">Lifetime links with automatic updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-gray-300 font-medium">Humanized customer support and installation help</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Support status card */}
            <div className="bg-[#121212] border border-neutral-800 p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-xl">
                      🧑‍💻
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#121212] animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Content Store Support</h4>
                    <span className="text-xs text-gray-400">Support Active</span>
                  </div>
                </div>
                <span className="bg-red-950/40 text-red-500 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-red-900/40">
                  ONLINE NOW
                </span>
              </div>

              <blockquote className="text-gray-300 italic text-xs leading-relaxed mb-6 bg-neutral-950 p-4 rounded-xl border-l-2 border-red-600">
                "Hello! Welcome to the Content Store. We are ready to assist you. Simply select your desired Pack above and click the buy button. If you have any questions about the pack content, payment options, or installation, talk to me directly on Telegram."
              </blockquote>

              <a
                href="https://t.me/sisjujd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:border-red-600/30 uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4 text-red-500" />
                Contact Us on Telegram (@sisjujd)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Site Footer - Sophisticated Dark Preset */}
      <footer className="bg-[#050505] border-t border-[#222] py-4 px-4 md:px-10 mt-auto text-center text-[10px] text-[#444] font-mono tracking-wider uppercase" id="footer-section">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            CONTENT STORE &copy; {new Date().getFullYear()} - PREMIUM CONTENT FOR PROFESSIONAL CREATORS
          </div>
          <div className="flex items-center gap-4 text-[9px] lowercase font-sans text-neutral-600 hover:text-neutral-400 transition-colors">
            <a href="https://t.me/sisjujd" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 font-bold uppercase transition-colors tracking-widest flex items-center gap-1">
              <Send className="w-2.5 h-2.5" /> Telegram (@sisjujd)
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Lightbox / Detail Portal Modal */}
      <AnimatePresence>
        {selectedPreviewPack && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedPreviewPack(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#121212] border border-neutral-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedPreviewPack(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-neutral-800 text-gray-400 hover:text-white p-2 rounded-full z-10 transition-colors border border-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Visual simulated player */}
              <div className="relative aspect-[16/10] bg-neutral-950 flex flex-col items-center justify-center border-b border-neutral-800 overflow-hidden group">
                {packVideos[selectedPreviewPack.id] ? (
                  <div className="absolute inset-0 w-full h-full flex flex-col bg-neutral-950">
                    <VideoPlayer 
                      src={packVideos[selectedPreviewPack.id]}
                      className="w-full h-full object-cover"
                      controls={true}
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded shadow z-10">
                      VIDEO PREVIEW
                    </div>
                  </div>
                ) : (
                  <>
                    <img 
                      src={selectedPreviewPack.imageUrl} 
                      alt="Pack background"
                      className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/40" />

                    {/* Animated Scanner Radar / Cybernetic overlay */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600/30 shadow-[0_0_8px_#ff0000] animate-bounce" />

                    {/* Lock Screen simulation */}
                    <div className="relative z-10 text-center max-w-xs flex flex-col items-center p-4">
                      <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-500 mb-4 animate-pulse">
                        <Lock className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-bold text-white tracking-wide text-sm mb-1 uppercase">
                        RESTRICTED PREVIEW SAMPLE
                      </h4>
                      <p className="text-gray-400 text-[11px] leading-relaxed mb-4">
                        To view the entire gallery and download the high-definition files, unlock your access on our Telegram channel.
                      </p>
                      
                      <div className="bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                        <Crown className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                        <span>Pack price: {packPrices[selectedPreviewPack.id] || selectedPreviewPack.price}</span>
                      </div>
                    </div>

                    {/* Simulated video playback tools at bottom */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-gray-500 bg-neutral-900/60 backdrop-blur px-3 py-1.5 rounded-lg border border-neutral-800/40">
                      <div className="flex items-center gap-2">
                        <Play className="w-3.5 h-3.5 text-red-500 fill-current" />
                        <span className="text-red-500">LIVE PREVIEW CLIPPED</span>
                      </div>
                      <span>00:03 / 01:25</span>
                    </div>
                  </>
                )}
              </div>

              {/* Pack details description */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-display font-extrabold text-xl text-white">
                    {packTitles[selectedPreviewPack.id] || selectedPreviewPack.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {packDescriptions[selectedPreviewPack.id] || selectedPreviewPack.description}
                </p>



                {/* Final Order Action */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedPreviewPack(null)}
                    className="bg-neutral-800 hover:bg-neutral-700 text-gray-300 font-semibold text-xs px-4 rounded-xl transition-all"
                  >
                    Back
                  </button>
                  <a
                    href={`https://t.me/sisjujd?text=${encodeURIComponent(`Hello! I would like to purchase the following pack:

📦 Pack: ${packTitles[selectedPreviewPack.id] || selectedPreviewPack.title} (ID: ${selectedPreviewPack.id})
📝 Description: ${packDescriptions[selectedPreviewPack.id] || selectedPreviewPack.description}
💰 Price: ${packPrices[selectedPreviewPack.id] || selectedPreviewPack.price}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-950/20 uppercase tracking-widest text-center"
                  >
                    <Send className="w-4 h-4 fill-current" />
                    I want this Pack - {packPrices[selectedPreviewPack.id] || selectedPreviewPack.price}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Pack Customize Modal */}
      <AnimatePresence>
        {editingPack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setEditingPack(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#121212] border border-neutral-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setEditingPack(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-neutral-800 text-gray-400 hover:text-white p-2 rounded-full z-10 transition-colors border border-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] font-mono text-[#ff0000] font-bold uppercase tracking-wider">
                  Customization Module
                </span>
                <h3 className="text-white font-sans font-bold text-sm sm:text-base uppercase tracking-wide mt-1">
                  Pack #{editingPack.id} - {packTitles[editingPack.id] || editingPack.title}
                </h3>
                <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                  Instantly customize the price, description, and display video of this card.
                </p>
              </div>

              {/* Form container */}
              <div className="space-y-4 my-4 max-h-[50vh] overflow-y-auto pr-1">
                {/* Title input */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                    Pack Name / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amazing Family"
                    value={customTitleInput}
                    onChange={(e) => setCustomTitleInput(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#ff0000] rounded-lg py-2 px-3 text-xs text-gray-200 placeholder-neutral-600 focus:outline-none transition-all font-mono"
                  />
                </div>

                {/* Price input */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                    Sale Price
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $25 or $35"
                    value={customPriceInput}
                    onChange={(e) => setCustomPriceInput(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#ff0000] rounded-lg py-2 px-3 text-xs text-gray-200 placeholder-neutral-600 focus:outline-none transition-all font-mono"
                  />
                </div>

                {/* Description input */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    placeholder="Write the custom description for the package..."
                    rows={3}
                    value={customDescriptionInput}
                    onChange={(e) => setCustomDescriptionInput(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#ff0000] rounded-lg py-2 px-3 text-xs text-gray-200 placeholder-neutral-600 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Seleção do Tipo de Origem do Vídeo */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Display Video Source
                  </label>
                  <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setVideoSourceType("default");
                        setCustomUrlInput("");
                      }}
                      className={`py-1.5 px-2 rounded-md text-[10px] font-mono uppercase tracking-wider text-center transition-all ${
                        videoSourceType === "default"
                          ? "bg-[#ff0000] text-white font-bold"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                      }`}
                    >
                      Default
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoSourceType("local");
                        // Only clear if it is a remote link
                        if (customUrlInput && !customUrlInput.startsWith("data:") && !customUrlInput.startsWith("blob:")) {
                          setCustomUrlInput("");
                          setLocalVideoFileName("");
                          setLocalVideoSizeStatus("none");
                        }
                      }}
                      className={`py-1.5 px-2 rounded-md text-[10px] font-mono uppercase tracking-wider text-center transition-all ${
                        videoSourceType === "local"
                          ? "bg-[#ff0000] text-white font-bold"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                      }`}
                    >
                      Upload Local
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoSourceType("url");
                        // Only clear if it is a local upload
                        if (customUrlInput && (customUrlInput.startsWith("data:") || customUrlInput.startsWith("blob:"))) {
                          setCustomUrlInput("");
                        }
                      }}
                      className={`py-1.5 px-2 rounded-md text-[10px] font-mono uppercase tracking-wider text-center transition-all ${
                        videoSourceType === "url"
                          ? "bg-[#ff0000] text-white font-bold"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                      }`}
                    >
                      Web Link
                    </button>
                  </div>
                </div>

                {/* Área dinâmica conforme o tipo selecionado */}
                {videoSourceType === "default" && (
                  <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-4 text-center">
                    <p className="text-[10px] text-neutral-400 leading-relaxed">
                      Using the default package configuration. If this package has a default demonstration video, it will continue to be shown to customers.
                    </p>
                  </div>
                )}

                {videoSourceType === "local" && (
                  <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-4 space-y-3">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-[#ff0000]" />
                      Video: Local Device File
                    </h4>
                    <p className="text-[10px] text-neutral-500 leading-relaxed">
                      Select a video file (MP4/WebM) directly from your gallery or computer.
                    </p>
                    
                    <label className="flex flex-col items-center justify-center border border-dashed border-neutral-800 hover:border-[#ff0000] bg-[#1a1a1a]/40 hover:bg-[#1a1a1a]/80 transition-all py-5 px-3 rounded-lg cursor-pointer text-center group">
                      <Video className="w-6 h-6 text-neutral-600 group-hover:text-[#ff0000] mb-1.5 transition-colors" />
                      <span className="text-xs font-mono font-medium text-gray-300">Choose Video from Gallery</span>
                      <span className="text-[9px] text-neutral-500 mt-0.5">Supports MP4, WebM</span>
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const fileName = file.name;
                            setLocalVideoFileName(fileName);
                            
                            // 3.5 MB Limit for local storage base64
                            const maxPersistentSize = 3.5 * 1024 * 1024;
                            if (file.size <= maxPersistentSize) {
                              setLocalVideoSizeStatus("permanent");
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const base64Url = event.target?.result as string;
                                setCustomUrlInput(base64Url);
                              };
                              reader.readAsDataURL(file);
                            } else {
                              setLocalVideoSizeStatus("temp");
                              const fileUrl = URL.createObjectURL(file);
                              setCustomUrlInput(fileUrl);
                            }
                          }
                        }}
                      />
                    </label>

                    {/* Exibe o status do arquivo selecionado de forma limpa e profissional */}
                    {customUrlInput && (customUrlInput.startsWith("data:") || customUrlInput.startsWith("blob:")) && (
                      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-semibold">
                          <Check className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                          <span>Local Video Uploaded Successfully!</span>
                        </div>
                        {localVideoFileName && (
                          <div className="text-[10px] text-neutral-300 font-mono truncate">
                            <span className="text-neutral-500">File:</span> {localVideoFileName}
                          </div>
                        )}
                        <div className="text-[9px] leading-relaxed text-neutral-400">
                          {localVideoSizeStatus === "permanent" ? (
                            <span className="text-emerald-500 font-medium font-mono">✓ Saved permanently in your browser (compressed Base64).</span>
                          ) : (
                            <span className="text-amber-500 font-medium font-mono">⚠ Large video! Saved temporarily for review in this session (will expire on page reload).</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {videoSourceType === "url" && (
                  <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-4 space-y-3">
                    <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-[#ff0000]" />
                      Video: Direct Web Link
                    </h4>
                    <p className="text-[10px] text-neutral-500 leading-relaxed">
                      Enter a direct URL of a public video on the web. The link must end with .mp4 or .webm.
                    </p>
                    <input
                      type="url"
                      placeholder="https://example.com/my_video.mp4"
                      value={customUrlInput.startsWith("data:") || customUrlInput.startsWith("blob:") ? "" : customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#ff0000] rounded-lg py-2 px-3 text-xs text-gray-200 placeholder-neutral-600 focus:outline-none transition-all font-mono"
                    />
                    {customUrlInput && !customUrlInput.startsWith("data:") && !customUrlInput.startsWith("blob:") && (
                      <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Video link configured for the card!
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-900 mt-4">
                {(packVideos[editingPack.id] || packTitles[editingPack.id] || packDescriptions[editingPack.id] || packPrices[editingPack.id]) ? (
                  <button
                    onClick={() => {
                      resetPackDetails(editingPack.id);
                      setEditingPack(null);
                    }}
                    className="text-neutral-500 hover:text-red-500 text-xs font-mono uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Reset to Default
                  </button>
                ) : (
                  <span className="text-[10px] text-neutral-600 font-mono">No changes</span>
                )}
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingPack(null)}
                    className="bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white px-3 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      savePackDetails(editingPack.id, customUrlInput, customTitleInput, customDescriptionInput, customPriceInput);
                      setEditingPack(null);
                    }}
                    className="bg-[#ff0000] hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all uppercase tracking-wider cursor-pointer"
                  >
                    Save All
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showAdminPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowAdminPasswordModal(false);
              setAdminPasswordError("");
              setAdminPasswordInput("");
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-[#1f1f1f] rounded-xl w-full max-w-sm p-6 relative shadow-2xl"
            >
              <button
                onClick={() => {
                  setShowAdminPasswordModal(false);
                  setAdminPasswordError("");
                  setAdminPasswordInput("");
                }}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-10 h-10 bg-red-950/60 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3 border border-red-900/30">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Administrator Access</h3>
                <p className="text-[10px] text-neutral-400 mt-1 font-sans">Enter the master key to unlock pack edit mode.</p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5">Master Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#ff0000] rounded-lg py-2.5 px-3.5 text-xs text-gray-200 focus:outline-none transition-all font-mono"
                    autoFocus
                  />
                </div>

                {adminPasswordError && (
                  <div className="text-[10px] text-red-500 font-mono font-medium text-center">
                    ⚠ {adminPasswordError}
                  </div>
                )}

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminPasswordModal(false);
                      setAdminPasswordError("");
                      setAdminPasswordInput("");
                    }}
                    className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Access
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Elements (Telegram link + Scroll top) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-11 h-11 rounded-full bg-neutral-900 hover:bg-red-600 text-gray-400 hover:text-white flex items-center justify-center border border-neutral-800 hover:border-red-500 transition-all shadow-lg shadow-black/80"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
        <a
          href="https://t.me/sisjujd"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-xl shadow-red-950/30 hover:scale-105 active:scale-95 group relative"
          title="Contact Us on Telegram"
        >
          <Send className="w-6 h-6 fill-current ml-0.5" />
          <span className="absolute right-full mr-3 bg-neutral-900 border border-neutral-800 text-[#fff] text-[10px] font-mono px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-xl pointer-events-none">
            Telegram Support Active
          </span>
        </a>
      </div>
    </div>
  );
}
