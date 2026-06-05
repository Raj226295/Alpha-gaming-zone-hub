import SectionHeading from './SectionHeading'

function GalleryView({ gallery, onNavigate }) {
  return (
    <div className="alpha-home alpha-subview">
      <section className="glass-panel alpha-focus-panel">
        <div className="alpha-focus-copy">
          <span className="section-eyebrow">Venue gallery</span>
          <h2>All the lounge visuals in one cleaner, dedicated space.</h2>
          <p>
            The homepage now stays lighter, while this screen shows the full atmosphere,
            setups, and gaming moments without squeezing everything into one page.
          </p>
        </div>

        <div className="alpha-focus-actions">
          <button type="button" className="primary-button" onClick={() => onNavigate('booking')}>
            Book Your Visit
          </button>
          <button type="button" className="secondary-button" onClick={() => onNavigate('home')}>
            Back Home
          </button>
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Gallery"
          title="A closer look at the arena, the setups, and the tournament-ready vibe."
          description="Tap into the full visual lineup here instead of loading everything on the landing page."
        />

        <div className="alpha-gallery-grid alpha-gallery-grid-expanded">
          {gallery.map((item) => (
            <figure key={item.title} className="alpha-gallery-tile">
              <img src={item.image} alt={item.title} />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}

export default GalleryView
