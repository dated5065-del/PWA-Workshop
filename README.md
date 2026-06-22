# TaskFlow - Progressive Web App (PWA)

![TaskFlow Logo](https://img.shields.io/badge/TaskFlow-PWA-6366f1?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

A modern, responsive Progressive Web App for efficient task management with full offline support, dark mode, and IndexedDB storage.

## 🌟 Features

### Core PWA Features
- ✅ **Installable** - Install as a standalone app on your home screen
- ✅ **Offline-First** - Works seamlessly without internet connection
- ✅ **Fast Loading** - Service Worker caching for instant performance
- ✅ **Responsive Design** - Optimized for mobile, tablet, and desktop
- ✅ **Progressive Enhancement** - Works on older browsers with graceful degradation

### Task Management
- ✅ **Add Tasks** - Quick and easy task creation
- ✅ **Edit Tasks** - Modify existing tasks
- ✅ **Delete Tasks** - Remove completed or unwanted tasks
- ✅ **Mark Complete** - Track task progress with checkboxes
- ✅ **Filter Tasks** - View All, Active, or Completed tasks
- ✅ **Task Statistics** - See total, completed, and remaining counts

### Advanced Features
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **IndexedDB Storage** - Local, persistent data storage
- ✅ **Service Worker** - Advanced caching strategies
- ✅ **Web Manifest** - Full PWA installation support
- ✅ **Contact Form** - Built-in feedback mechanism

## 📱 Screenshots

### Desktop View
- Clean, spacious layout
- Multi-column task display
- Full feature visibility

### Mobile View
- Single column, optimized for touch
- Hamburger navigation menu
- Readable font sizes

### Dark Mode
- Easy on the eyes
- Smooth transitions
- Persistent preference

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - works locally
- No dependencies or build tools needed

### Installation

#### Option 1: Browser Installation
1. Open [TaskFlow PWA](https://yoururl.com)
2. Click the "Install" button (or use browser menu)
3. App appears on your home screen
4. Open and use like a native app

#### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/dated5065-del/PWA-Workshop.git

# Navigate to project
cd PWA-Workshop

# Serve locally (using Python)
python -m http.server 8000

# Or using Node.js/npm
npx http-server

# Open in browser
http://localhost:8000
```

### Usage

#### Adding a Task
1. Type your task in the input field
2. Click "Add Task" or press Enter
3. Task appears in the list

#### Managing Tasks
- **Mark Complete:** Click the checkbox
- **Edit:** Click the ✏️ button
- **Delete:** Click the 🗑️ button

#### Filtering Tasks
- Click "All" to see all tasks
- Click "Active" for incomplete tasks
- Click "Completed" for done tasks

#### Using Dark Mode
- Click the 🌙 (moon) icon to toggle dark mode
- Your preference is saved automatically

#### Working Offline
1. Disconnect from internet
2. App continues to work normally
3. Make changes to your tasks
4. When reconnected, changes are ready to sync

## 📁 Project Structure

```
PWA-Workshop/
├── index.html              # Home page with task manager
├── about.html              # About page
├── features.html           # Features showcase
├── contact.html            # Contact form & FAQ
├── offline.html            # Offline fallback page
├── manifest.json           # PWA manifest
├── DOCUMENTATION.md        # Detailed documentation
├── README.md              # This file
├── css/
│   └── styles.css         # Main stylesheet (1000+ lines)
└── js/
    ├── app.js             # Main application logic
    ├── db.js              # IndexedDB database handler
    ├── contact.js         # Contact form handler
    └── service-worker.js  # Service worker for offline support
```

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup and form elements
- **CSS3** - Grid, Flexbox, Custom Properties, Transitions
- **JavaScript (Vanilla)** - No frameworks, pure ES6+

### Web APIs
- **Service Workers** - Offline functionality and caching
- **IndexedDB** - Local database storage
- **Web App Manifest** - Installation support
- **Fetch API** - Network requests
- **localStorage** - Simple key-value storage

### Performance
- **Cache-First Strategy** - Instant loading on repeat visits
- **Critical CSS** - Inline critical styles
- **Code Splitting** - Modular JavaScript files
- **Lazy Loading** - Images and non-critical resources

## 🎨 Design System

### Color Palette
- **Primary:** #6366f1 (Indigo)
- **Primary Dark:** #4f46e5
- **Primary Light:** #818cf8
- **Background:** #f9fafb (Light) / #111827 (Dark)
- **Text:** #1f2937 (Light) / #f3f4f6 (Dark)
- **Success:** #10b981 (Green)
- **Danger:** #ef4444 (Red)
- **Warning:** #f59e0b (Orange)

### Typography
- **Font:** Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Sizes:** 0.75rem to 1.875rem
- **Line Height:** 1.6 (body) to 1.8 (content)
- **Font Weight:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing System
- **Base Unit:** 0.25rem (4px)
- **Scale:** xs(0.25), sm(0.5), md(1), lg(1.5), xl(2), 2xl(3)
- **Consistent:** All elements use this scale

### Responsive Breakpoints
- **Desktop:** 1200px and above
- **Tablet:** 768px - 1199px
- **Mobile:** 480px - 767px
- **Small Mobile:** Below 480px

## 🔒 Offline Support

### What Works Offline
- ✅ View all pages
- ✅ Create new tasks
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Toggle dark mode
- ✅ Filter tasks
- ✅ View statistics

### Service Worker Features
- **Installation:** Assets cached on first load
- **Activation:** Old caches cleaned up
- **Fetch Handling:** Cache-first strategy with network fallback
- **Offline Page:** Custom fallback for failed requests

### Data Persistence
- Tasks stored in IndexedDB
- Survives browser restart
- No data loss on crashes
- Automatic garbage collection

## 📊 Browser Support

| Browser | Desktop | Mobile | Notes |
|---------|---------|--------|-------|
| Chrome | ✅ 90+ | ✅ 90+ | Full support |
| Firefox | ✅ 88+ | ✅ 88+ | Full support |
| Safari | ✅ 14+ | ✅ 14+ | Partial (no install) |
| Edge | ✅ 90+ | ✅ 90+ | Full support |
| Opera | ✅ 76+ | ✅ 76+ | Full support |

## 🧪 Testing

### Manual Testing
1. **Service Worker:** DevTools → Application → Service Workers
2. **Cache Storage:** DevTools → Application → Cache Storage
3. **IndexedDB:** DevTools → Application → IndexedDB
4. **Offline Mode:** DevTools → Network → Offline checkbox
5. **Performance:** DevTools → Performance tab
6. **Accessibility:** DevTools → Lighthouse

### Automated Testing (Optional)
```bash
# Run Lighthouse audit
npm install -g lighthouse
lighthouse https://yoururl.com --view

# Run accessibility audit
npm install -g pa11y
pa11y https://yoururl.com
```

### Test Checklist
- [ ] Service worker registers successfully
- [ ] App loads offline
- [ ] Tasks persist after refresh
- [ ] Dark mode toggles smoothly
- [ ] All pages are responsive
- [ ] Forms validate properly
- [ ] Navigation works on all pages
- [ ] Touch interactions work on mobile
- [ ] Performance metrics acceptable
- [ ] Accessibility score 90+

## 📈 Performance Metrics

### Target Metrics
- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Lighthouse Score:** 90+

### Optimization Techniques
- Service worker caching for instant loads
- CSS variables for efficient theme switching
- Minimal JavaScript bundle (< 30KB)
- Semantic HTML for better parsing
- Optimized images and icons
- Lazy loading for off-screen content

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- ✅ Sufficient color contrast (4.5:1 minimum)
- ✅ Keyboard navigation support
- ✅ Focus visible indicators
- ✅ Semantic HTML structure
- ✅ ARIA labels where needed
- ✅ Form validation messages
- ✅ Screen reader support
- ✅ Reduced motion support

### Accessibility Features
- Keyboard Tab navigation
- Focus visible on all interactive elements
- Semantic heading hierarchy
- Alt text for icons
- Form labels properly associated
- Error messages clearly indicated
- Color not sole means of communication

## 🔧 Development

### File Explanations

#### `index.html` (Home Page)
- Task input form
- Filter buttons
- Task list display
- Statistics dashboard
- Clear completed button

#### `about.html` (About Page)
- Project information
- Technology stack
- Mission statement
- Why TaskFlow was built

#### `features.html` (Features Page)
- Feature cards showcase
- Benefits explanation
- How it works steps
- Technology highlights

#### `contact.html` (Contact Page)
- Contact information
- Feedback form
- FAQ section
- Support information

#### `css/styles.css` (1000+ lines)
- CSS custom properties for theming
- Responsive grid and flexbox layouts
- Dark mode variables
- Mobile breakpoints
- Smooth transitions
- Accessibility features

#### `js/app.js` (Main Logic)
- Service worker registration
- Task CRUD operations
- UI rendering and updates
- Event handling
- Theme management
- Online status detection

#### `js/db.js` (Database)
- IndexedDB initialization
- Task storage operations
- Query methods
- Data persistence logic

#### `js/service-worker.js` (Background Service)
- Asset caching on install
- Fetch event handling
- Cache update logic
- Offline fallback

#### `manifest.json` (PWA Metadata)
- App name and description
- Installation icons
- Theme colors
- Display mode
- Start URL

## 🐛 Troubleshooting

### Service Worker Not Registering
**Problem:** "Service Worker registration failed"
**Solution:** 
- Check file exists at `/js/service-worker.js`
- Verify HTTPS in production
- Check browser console for errors
- Try hard refresh: Ctrl+Shift+R

### Tasks Not Saving
**Problem:** Tasks disappear after refresh
**Solution:**
- Open DevTools → Application → IndexedDB
- Check if "TaskFlowDB" database exists
- Verify IndexedDB is enabled
- Check browser storage quota

### Dark Mode Not Working
**Problem:** Theme toggle doesn't change colors
**Solution:**
- Check localStorage is enabled
- Verify CSS variables are loaded
- Try clearing cache: Ctrl+Shift+Delete
- Test in incognito mode

### App Not Installing
**Problem:** No install prompt appears
**Solution:**
- Must be served over HTTPS (except localhost)
- Check manifest.json is valid
- Verify manifest is linked in HTML
- Check service worker is active
- Wait 2-5 minutes for manifest to cache

### Offline Page Shows When Online
**Problem:** Gets /offline.html on online pages
**Solution:**
- Clear service worker: DevTools → Application → Service Workers → Unregister
- Clear cache: DevTools → Application → Cache Storage → Delete
- Hard refresh: Ctrl+Shift+R
- Check network connection

## 📚 Learning Resources

### Official Documentation
- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [MDN - Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [MDN - IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Web.dev - PWA](https://web.dev/progressive-web-apps/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - PWA Auditing
- [WAVE](https://wave.webaim.org/) - Accessibility Testing
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) - Debugging

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit them (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💼 Author

**Your Name** - [@dated5065-del](https://github.com/dated5065-del)

## 🙏 Acknowledgments

- Created for CET373 - Mobile Technologies Workshop
- Inspired by modern web development best practices
- Thanks to MDN Web Docs for comprehensive documentation
- Built with ❤️ for better productivity

## 📞 Support

### Getting Help
1. Check [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed guides
2. Review [GitHub Issues](https://github.com/dated5065-del/PWA-Workshop/issues)
3. Check browser console for error messages
4. Try the Troubleshooting section above

### Reporting Bugs
- Open a GitHub Issue
- Include browser version
- Describe steps to reproduce
- Share console error messages
- Add screenshots if applicable

### Feature Requests
- Open a GitHub Issue with "Feature Request" label
- Explain the use case
- Describe expected behavior
- Suggest implementation approach

---

## 🎉 Ready to Use!

TaskFlow is ready for production use. Install it today and take control of your tasks!

**[Visit TaskFlow](https://yoururl.com)** | **[View Documentation](./DOCUMENTATION.md)** | **[Report Issues](https://github.com/dated5065-del/PWA-Workshop/issues)**

---

**Made with ❤️ • Works Offline • No Sign-up Required**
