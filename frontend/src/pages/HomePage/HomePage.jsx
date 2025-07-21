import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; 
import heroImage from '../../assets/hero.png';
import workshopsData from '../../data/workshops.json'; 

const HomePage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [workshops, setWorkshops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState(''); // single string for tag
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    setWorkshops(workshopsData.workshops);
  }, []);

  // Track mouse movement inside hero section for gradient effect 
     useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      return () => heroSection.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const gradientStyle = {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                 rgba(90, 60, 255, 0.15) 0%, 
                 rgba(147, 51, 234, 0.1) 25%, 
                 rgba(3, 6, 26, 0.8) 50%, 
                 rgba(3, 6, 26, 1) 100%)`
  };

  const toggleSort = () => setIsSorted(!isSorted);

  const filteredWorkshops = workshops
    .filter((workshop) => {
      const search = searchTerm.toLowerCase();
      const matchesTitle = workshop.title.toLowerCase().includes(search);
      const matchesTags = workshop.tags.some(tag => tag.toLowerCase().includes(search));
      const matchesCategory = workshop.category.toLowerCase().includes(search);
      return matchesTitle || matchesTags || matchesCategory;
    })
    .filter((workshop) =>
      selectedCategory ? workshop.category === selectedCategory : true
    )
    .filter((workshop) =>
      selectedTags ? workshop.tags.includes(selectedTags) : true
    );

  const displayedWorkshops = isSorted
    ? [...filteredWorkshops].sort((a, b) => new Date(a.date) - new Date(b.date))
    : filteredWorkshops;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTags('');
    setIsSorted(false);
  };

  // Handle View More button click - navigate to details page
  const handleViewMore = (workshopId) => {
    navigate(`/workshop/${workshopId}`);
  };

  return (
    <>
      <div className="hero-section" style={gradientStyle}>
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
        </div>
        
        <div className="hero-text">
          <div className="text-glow">
            <h1>
              Spark your curiosity, <br />
              <span className="highlight">fuel your ambition</span> - <br />
              grow your skills and lead the future.
            </h1>
          </div>
          <p>
            Explore hands-on workshops, register with ease, and shape your future with every skill you learn.
          </p>
          <div className="cta-buttons">
            <button
              className="btn-primary"
              onClick={() => {
                const element = document.getElementById('filter-controls');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>Get Started</span>
            </button>
            <button className="btn-secondary-1"><span>Learn More</span></button>
          </div>
        </div>

        <div className="hero-image glow-effect">
          <div className="image-container">
            <div className="image-backdrop"></div>
            <img src={heroImage} alt="Hero" className="pulse-effect" />
          </div>
        </div>
      </div>

      {/* Filter Controls container holding all filtering UI elements */}
      <div id="filter-controls" className="filter-controls">

        {/* Search input for filtering workshops by title or tags */}
        <div className="filter-group search-group">
          <input
            type="text"
            placeholder="Search workshops (by title or tag)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Updates the search term state
          />
        </div>

        {/* Dropdown to filter workshops by category */}
        <div className="filter-group select-group">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} // Updates selected category
          >
            <option value="">All Categories</option>
            {workshopsData.categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option> // Dynamically renders category options
            ))}
          </select>
        </div>

        {/* Dropdown to filter workshops by tag */}
        <div className="filter-group select-group">
          <select
            value={selectedTags}
            onChange={(e) => setSelectedTags(e.target.value)} // Updates selected tag
          >
            <option value="">All Tags</option>
            {workshopsData.tags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Buttons to sort by date or clear all filters */}
        <div className="filter-group button-group">
          <button className="-1" onClick={toggleSort}>
            {isSorted ? 'Unsort' : 'Sort by Date'} {/* Toggles sorting state */}
          </button>
          <button className="btn-secondary-1 clear-filters" onClick={clearFilters}>
            Clear Filters {/* Resets all filters to default */}
          </button>
        </div>

      </div>

      {/* Workshop Grid */}
      <div className="workshop-grid-section">
        <h2 className="workshop-heading">Available Workshops</h2>
        {displayedWorkshops.length === 0 ? (
          <p className="no-results">No workshops match your search/filter criteria.</p>
        ) : (
          <div className="workshop-grid">
            {displayedWorkshops.map((workshop) => (
              <div key={workshop.id} className="workshop-card">
                <img src={workshop.image} alt={workshop.title} className="workshop-image" />
                <h3 className="workshop-title">{workshop.title}</h3>
                <p className="workshop-date">{workshop.date}</p>
                <button 
                  className="view-more-button"
                  onClick={() => handleViewMore(workshop.id)}
                >
                  View More →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
