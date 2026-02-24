const { useState, useEffect, useRef } = React;

const API_BASE = 'http://127.0.0.1:8000/api';

// --- Icons Helper ---
const Icon = ({ name, size = 24, className }) => {
    const ref = useRef(null);

    React.useEffect(() => {
        const container = ref.current;
        if (!container || !window.lucide) return;

        // Clear previous icon
        container.innerHTML = '';

        // Create a fresh <i> element for Lucide to process
        const iconEl = document.createElement('i');
        iconEl.setAttribute('data-lucide', name);
        if (className) iconEl.className = className;
        container.appendChild(iconEl);

        // Let Lucide replace it with SVG inside our container
        lucide.createIcons();
    }, [name, size, className]);

    return <span ref={ref} style={{ display: 'inline-flex', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}></span>;
};

// --- Components ---

const Header = ({ cartCount, openCart, goHome }) => (
    <header className="fixed top-0 w-full z-50 glass-header transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
                {/* Logo Area */}
                <div onClick={goHome} className="flex items-center cursor-pointer group">
                    <div className="p-2 md:p-2.5 bg-gradient-to-tr from-royal-600 to-royal-800 rounded-xl text-white mr-2 md:mr-3 group-hover:scale-105 transition duration-300">
                        <Icon name="crown" size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-serif text-lg md:text-2xl font-bold text-slate-900 tracking-tight leading-none">AMOUR OF GOD</h1>
                        <p className="text-[0.6rem] md:text-xs text-royal-600 font-bold tracking-[0.2em] uppercase mt-0.5 md:mt-1">Bookshop</p>
                    </div>
                </div>

                {/* Navigation / Cart */}
                <button
                    onClick={openCart}
                    className="relative group p-2 md:p-3 rounded-full hover:bg-slate-100 transition-colors"
                >
                    <div className="text-slate-700 group-hover:text-royal-600 transition-colors">
                        <Icon name="shopping-bag" size={24} className="md:w-[26px] md:h-[26px]" />
                    </div>
                    {cartCount > 0 && (
                        <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 md:w-5 md:h-5 text-[10px] font-bold text-white bg-red-600 rounded-full ring-2 ring-white">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    </header>
);

const Hero = ({ books, selectBook, scrollToCollection }) => {
    const carouselBooks = [...books, ...books, ...books];

    return (
        <div className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden bg-slate-900 text-white min-h-[500px] md:min-h-[600px] flex flex-col justify-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="url(#grad1)" />
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#3454eb', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center mb-8 md:mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-gold-300 text-xs md:text-sm font-bold tracking-wider uppercase mb-4 md:mb-6 animate-slide-up">
                    <Icon name="sparkles" size={14} className="md:w-4 md:h-4" /> Spirit-Filled Literature
                </span>
                <h2 className="text-4xl md:text-7xl font-serif font-black leading-tight mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Wisdom for Your <br /> Divine Purpose
                </h2>
                <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto mb-6 md:mb-8 px-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    Discover transformative books that build faith, character, and kingdom wealth. Your journey to 1000x more starts here.
                </p>
                <button
                    onClick={scrollToCollection}
                    className="bg-gold-500 text-slate-900 font-bold px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-gold-400 transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto animate-slide-up text-sm md:text-base" style={{ animationDelay: '0.3s' }}
                >
                    Explore Collection <Icon name="arrow-down" size={18} className="md:w-5 md:h-5" />
                </button>
            </div>

            {/* Infinite Carousel */}
            {books.length > 0 && (
                <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)] md:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] mt-4 md:mt-8">
                    <div className="flex items-center animate-scroll">
                        {carouselBooks.map((book, index) => (
                            <div
                                key={`${book.id}-${index}`}
                                onClick={() => selectBook(book)}
                                className="mx-3 md:mx-6 w-32 md:w-56 flex-shrink-0 cursor-pointer group perspective-1000"
                            >
                                <div className="relative transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-4 rounded-lg overflow-hidden border-2 md:border-4 border-white/10">
                                    <img src={book.image} alt={book.title} className="w-full h-auto object-cover aspect-[2/3]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const Features = () => (
    <div className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
                <div className="p-6 rounded-2xl bg-royal-50 hover:bg-royal-100 transition duration-300 group">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-royal-600 group-hover:scale-110 transition duration-300">
                        <Icon name="book-open-check" size={28} className="md:w-8 md:h-8" />
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 md:mb-3 text-slate-900">Curated Wisdom</h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">Hand-picked titles from world-renowned spiritual leaders to guide your walk with God.</p>
                </div>
                <div className="p-6 rounded-2xl bg-gold-50 hover:bg-gold-100 transition duration-300 group">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-gold-600 group-hover:scale-110 transition duration-300">
                        <Icon name="zap" size={28} className="md:w-8 md:h-8" />
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 md:mb-3 text-slate-900">Instant Access</h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">Easy ordering via WhatsApp. Get your physical copies delivered swiftly to your doorstep.</p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-50 hover:bg-purple-100 transition duration-300 group">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-purple-600 group-hover:scale-110 transition duration-300">
                        <Icon name="heart-handshake" size={28} className="md:w-8 md:h-8" />
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 md:mb-3 text-slate-900">Kingdom Growth</h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">Resources designed not just to be read, but to transform your life and ministry.</p>
                </div>
            </div>
        </div>
    </div>
);

const categories = [
    { key: 'all', label: 'All', icon: 'layers' },
    { key: 'spiritual_growth', label: 'Spiritual Growth', icon: 'flame' },
    { key: 'ministry_leadership', label: 'Ministry & Leadership', icon: 'crown' },
    { key: 'relationships_family', label: 'Relationships & Family', icon: 'heart-handshake' },
    { key: 'personal_development', label: 'Personal Development', icon: 'sparkles' },
    { key: 'business_finance', label: 'Business & Finance', icon: 'coins' },
    { key: 'communication_influence', label: 'Communication', icon: 'megaphone' },
    { key: 'purpose_destiny', label: 'Purpose & Destiny', icon: 'compass' },
];

const BookGrid = ({ books, onBookClick, activeFilter, onFilterChange }) => {
    const filteredBooks = activeFilter === 'all'
        ? books
        : books.filter(book => book.category === activeFilter);

    return (
        <div id="collection" className="max-w-7xl mx-auto px-4 py-12 md:py-20 bg-slate-50">
            <div className="text-center mb-10 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-3 md:mb-4">The Library</h2>
                <div className="h-1.5 w-16 md:w-24 bg-gold-500 mx-auto rounded-full"></div>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex gap-2 md:gap-3 mb-8 md:mb-12 overflow-x-auto pb-2 md:pb-0 md:justify-center md:flex-wrap scrollbar-hide px-1">
                {categories.map(cat => (
                    <button
                        key={cat.key}
                        onClick={() => onFilterChange(cat.key)}
                        className={`inline-flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-200 border flex-shrink-0 whitespace-nowrap ${activeFilter === cat.key
                            ? 'bg-royal-600 text-white border-royal-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-royal-300 hover:text-royal-600'
                            }`}
                    >
                        <Icon name={cat.icon} size={14} className="md:w-4 md:h-4" />
                        {cat.label}
                        {activeFilter === cat.key && cat.key !== 'all' && (
                            <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-0.5">
                                {filteredBooks.length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {filteredBooks.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                    <Icon name="book-open" size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">{activeFilter === 'all' ? 'No books available yet.' : `No ${activeFilter} books yet.`}</p>
                    <p className="text-sm mt-1">Check back soon for new arrivals!</p>
                    {activeFilter !== 'all' && (
                        <button
                            onClick={() => onFilterChange('all')}
                            className="mt-4 text-royal-600 font-bold text-sm hover:underline"
                        >
                            View all books
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
                    {filteredBooks.map(book => (
                        <div
                            key={book.id}
                            onClick={() => onBookClick(book)}
                            className="group bg-white rounded-xl md:rounded-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col relative border border-slate-200"
                        >
                            <div className="relative overflow-hidden aspect-[2/3]">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => { e.target.src = 'https://placehold.co/400x600?text=Book+Cover' }}
                                />
                                <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/95 backdrop-blur px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg font-bold text-slate-900 text-xs md:text-sm z-10 flex items-center gap-1">
                                    <span className="text-[10px] md:text-xs text-slate-500">GH¢</span>
                                    {book.price}
                                </div>
                                <div className="absolute inset-0 bg-royal-900/0 group-hover:bg-royal-900/20 transition-colors duration-300 hidden md:flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-royal-900 font-bold px-6 py-2 rounded-full">
                                        View Details
                                    </span>
                                </div>
                            </div>
                            <div className="p-3 md:p-5 flex flex-col flex-grow">
                                <h3 className="font-serif font-bold text-slate-900 text-sm md:text-lg leading-snug mb-1 md:mb-2 line-clamp-2 group-hover:text-royal-600 transition-colors">
                                    {book.title}
                                </h3>
                                {book.category && (
                                    <span className="text-[10px] md:text-xs text-royal-500 font-bold uppercase tracking-wider mb-1">{book.category}</span>
                                )}
                                <div className="mt-auto pt-2 md:pt-3 border-t border-slate-100 flex justify-between items-center text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                    <span>Available Now</span>
                                    <Icon name="arrow-right" size={14} className="group-hover:translate-x-1 transition-transform hidden md:block" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ProductPage = ({ book, allBooks, onBack, addToCart, onSelectBook }) => {
    const otherBooks = allBooks
        .filter(b => b.id !== book.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    return (
        <div className="min-h-screen bg-slate-50 animate-fade-in pb-20">
            <div className="h-16 md:h-20"></div>

            <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
                <button
                    onClick={onBack}
                    className="mb-6 flex items-center text-slate-500 hover:text-royal-600 transition font-bold group bg-white px-4 py-2 rounded-full w-fit text-sm md:text-base border border-slate-200"
                >
                    <Icon name="arrow-left" className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
                    Back to Collection
                </button>

                <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden mb-12 border border-slate-200">
                    <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-0">
                        {/* Image Section */}
                        <div className="lg:col-span-5 bg-slate-100 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-slate-200/50 backdrop-blur-3xl z-0"></div>
                            <div className="relative z-10 p-6 md:p-8 h-full flex items-center justify-center">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-2/3 md:w-2/3 h-auto object-cover rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="lg:col-span-7 p-6 md:p-12 flex flex-col justify-center bg-white relative z-10">
                            <div className="flex items-center space-x-1 text-gold-500 mb-3 md:mb-4">
                                {[1, 2, 3, 4, 5].map(s => <Icon key={s} name="star" size={16} className="fill-current" />)}
                                <span className="text-xs md:text-sm text-slate-400 font-bold ml-2 uppercase tracking-wider">Top Rated</span>
                            </div>

                            <h1 className="text-2xl md:text-5xl font-serif font-black text-slate-900 mb-4 leading-tight">{book.title}</h1>

                            {book.category && (
                                <span className="inline-block px-3 py-1 bg-royal-50 text-royal-600 text-xs font-bold rounded-full uppercase tracking-wide mb-4 w-fit">{book.category}</span>
                            )}

                            <div className="flex items-center gap-4 mb-6 md:mb-8">
                                <span className="text-3xl md:text-4xl text-royal-600 font-bold font-serif">GH¢ {book.price}</span>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">In Stock</span>
                            </div>

                            <p className="text-base md:text-lg leading-relaxed text-slate-600 mb-6 md:mb-8 border-l-4 border-royal-200 pl-4 md:pl-6">
                                {book.description}
                            </p>

                            <button
                                onClick={() => addToCart(book)}
                                className="w-full md:w-auto bg-royal-600 hover:bg-royal-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                <Icon name="shopping-bag" size={20} />
                                Add to Basket
                            </button>
                        </div>
                    </div>
                </div>

                {/* Other Books Section */}
                {otherBooks.length > 0 && (
                    <div className="mt-12 md:mt-20">
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-6 md:mb-8 flex items-center">
                            <span className="bg-gold-500 w-1.5 md:w-2 h-6 md:h-8 mr-3 rounded-full"></span>
                            You May Also Like
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {otherBooks.map(other => (
                                <div
                                    key={other.id}
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                        onSelectBook(other);
                                    }}
                                    className="bg-white p-3 md:p-4 rounded-xl transition cursor-pointer group border border-slate-100"
                                >
                                    <div className="relative overflow-hidden rounded-lg mb-3 aspect-[2/3]">
                                        <img src={other.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-xs md:text-sm line-clamp-2 mb-1 group-hover:text-royal-600">{other.title}</h4>
                                    <p className="text-slate-500 text-[10px] md:text-xs font-bold">GH¢ {other.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AboutUs = () => (
    <div className="bg-gradient-to-br from-royal-900 to-slate-900 py-16 md:py-24 px-4 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-royal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-xl mb-6">
                <Icon name="users" className="text-gold-400" size={32} />
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">About Amour of God</h2>

            <div className="space-y-6 text-royal-100 text-base md:text-lg leading-relaxed">
                <p>
                    Welcome to <span className="text-gold-400 font-bold">Amour of God BookShop</span>, your sanctuary for spiritual growth and kingdom knowledge.
                    We are more than just a bookstore; we are a ministry dedicated to equipping believers with the tools they need to reign in life.
                </p>
                <p className="hidden md:block">
                    Our curated collection features timeless classics and contemporary masterpieces that address every aspect of the Christian walk—from financial dominion and leadership to prayer and personal character.
                </p>
                <p className="font-serif italic text-lg md:text-xl text-white pt-4 border-t border-white/10 inline-block px-8">
                    "My people are destroyed for lack of knowledge." — Hosea 4:6
                </p>
                <p>
                    We exist to bridge that gap, bringing you the wisdom of generals of the faith to help you unlock
                    <span className="text-gold-400 font-bold"> 1000 times more</span> in every area of your destiny.
                </p>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-lg bg-white/5 backdrop-blur border border-white/10">
                    <h4 className="text-2xl font-bold text-gold-400 mb-1">500+</h4>
                    <p className="text-xs text-slate-300 uppercase tracking-wider">Lives Touched</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 backdrop-blur border border-white/10">
                    <h4 className="text-2xl font-bold text-gold-400 mb-1">24/7</h4>
                    <p className="text-xs text-slate-300 uppercase tracking-wider">Support</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 backdrop-blur border border-white/10">
                    <h4 className="text-2xl font-bold text-gold-400 mb-1">100%</h4>
                    <p className="text-xs text-slate-300 uppercase tracking-wider">Kingdom Vibe</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 backdrop-blur border border-white/10">
                    <h4 className="text-2xl font-bold text-gold-400 mb-1">Fast</h4>
                    <p className="text-xs text-slate-300 uppercase tracking-wider">Delivery</p>
                </div>
            </div>
        </div>
    </div>
);

const CartModal = ({ isOpen, close, cart, updateQuantity, removeFromCart }) => {
    if (!isOpen) return null;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const whatsappNumber = "233530304844";

    const handleCheckout = () => {
        if (cart.length === 0) return;

        let message = `*NEW ORDER FROM AMOUR OF GOD BOOKSHOP* 👑\n\n`;
        cart.forEach(item => {
            message += `📖 ${item.title} (x${item.quantity}) - GH¢ ${item.price * item.quantity}\n`;
        });
        message += `\n*TOTAL: GH¢ ${total}*\n\nPlease confirm my order and delivery details.`;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={close}></div>

            <div className="relative w-full max-w-md bg-white flex flex-col h-full animate-fade-in">
                <div className="p-4 md:p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                        <Icon name="shopping-bag" className="text-royal-600" /> My Basket
                    </h2>
                    <button onClick={close} className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-red-100 hover:text-red-500 transition">
                        <Icon name="x" size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <Icon name="shopping-cart" size={32} className="text-slate-300" />
                            </div>
                            <p className="text-sm md:text-base">Your basket is empty.</p>
                            <button onClick={close} className="mt-4 text-royal-600 font-bold hover:underline">
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 md:space-y-6">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-3 md:gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <img src={item.image} className="w-14 h-18 md:w-16 md:h-20 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 text-xs md:text-sm line-clamp-2 leading-tight">{item.title}</h3>
                                        <p className="text-royal-600 font-bold text-xs md:text-sm mt-1">GH¢ {item.price}</p>

                                        <div className="flex items-center justify-between mt-2 md:mt-3">
                                            <div className="flex items-center bg-white border border-slate-200 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="px-2 py-1 text-slate-500 hover:bg-slate-50 rounded-l-lg text-xs"
                                                >-</button>
                                                <span className="px-2 text-xs font-bold text-slate-800 w-5 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="px-2 py-1 text-slate-500 hover:bg-slate-50 rounded-r-lg text-xs"
                                                >+</button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-full transition"
                                            >
                                                <Icon name="trash-2" size={14} className="md:w-4 md:h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-200">
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                            <span className="text-slate-500 font-medium text-sm">Subtotal</span>
                            <span className="text-xl md:text-2xl font-bold text-slate-900">GH¢ {total}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 md:py-4 rounded-xl flex items-center justify-center gap-3 transition transform hover:scale-[1.02] text-sm md:text-base"
                        >
                            <Icon name="message-circle" size={20} className="md:w-6 md:h-6" />
                            Checkout via WhatsApp
                        </button>
                        <p className="text-center text-[10px] md:text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
                            <Icon name="lock" size={12} /> Secure Checkout
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Footer = () => (
    <footer className="bg-slate-900 text-white pt-12 md:pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8 md:mb-12">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="p-2 bg-royal-600 rounded-lg">
                        <Icon name="crown" size={24} className="text-white" />
                    </div>
                    <span className="text-xl font-serif font-bold">Amour of God</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                    We are dedicated to providing life-changing Christian literature that empowers, inspires, and transforms. Walk in the light of knowledge.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-royal-600 transition text-slate-400 hover:text-white">
                        <Icon name="facebook" size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition text-slate-400 hover:text-white">
                        <Icon name="instagram" size={18} />
                    </a>
                </div>
            </div>

            <div>
                <h4 className="font-bold text-white mb-4 md:mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                    <li className="hover:text-gold-400 cursor-pointer transition">Home</li>
                    <li className="hover:text-gold-400 cursor-pointer transition">Best Sellers</li>
                    <li className="hover:text-gold-400 cursor-pointer transition">New Arrivals</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white mb-4 md:mb-6 uppercase tracking-wider text-sm">Contact Info</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                    <li className="flex items-start gap-3">
                        <Icon name="map-pin" size={18} className="text-royal-500 mt-0.5" />
                        <span>Accra, Ghana</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Icon name="phone" size={18} className="text-royal-500" />
                        <span>+233 53 030 4844</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Icon name="mail" size={18} className="text-royal-500" />
                        <span>support@amourofgod.com</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-xs">
            <p>&copy; 2024 Amour of God BookShop. All Rights Reserved.</p>
        </div>
    </footer>
);

const App = () => {
    const [view, setView] = useState('home');
    const [selectedBook, setSelectedBook] = useState(null);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [booksData, setBooksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');

    // Fetch books from Django API
    useEffect(() => {
        fetch(`${API_BASE}/books/`)
            .then(res => res.json())
            .then(data => {
                setBooksData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching books:', err);
                setLoading(false);
            });
    }, []);



    const scrollToCollection = () => {
        const element = document.getElementById('collection');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setView('details');
        window.scrollTo(0, 0);
    };

    const handleGoHome = () => {
        setView('home');
        setSelectedBook(null);
        window.scrollTo(0, 0);
    };

    const addToCart = (book) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === book.id);
            if (existing) {
                return prev.map(item =>
                    item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...book, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const updateQuantity = (id, change) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + change;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-royal-200 border-t-royal-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">Loading books...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
            <Header
                cartCount={cartCount}
                openCart={() => setIsCartOpen(true)}
                goHome={handleGoHome}
            />

            <main className="flex-grow">
                {view === 'home' && (
                    <>
                        <Hero
                            books={booksData}
                            selectBook={handleBookClick}
                            scrollToCollection={scrollToCollection}
                        />
                        <Features />
                        <BookGrid books={booksData} onBookClick={handleBookClick} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                        <AboutUs />
                    </>
                )}

                {view === 'details' && selectedBook && (
                    <ProductPage
                        book={selectedBook}
                        allBooks={booksData}
                        onBack={handleGoHome}
                        addToCart={addToCart}
                        onSelectBook={handleBookClick}
                    />
                )}
            </main>

            {view === 'home' && <Footer />}
            {view === 'details' && <div className="py-8 text-center text-slate-400 text-sm">&copy; Amour of God Bookshop</div>}

            <CartModal
                isOpen={isCartOpen}
                close={() => setIsCartOpen(false)}
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
            />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
