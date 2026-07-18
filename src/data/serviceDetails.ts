export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  heroImage: string;
  iconName: string;
  features: string[];
  benefits: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  specs: { label: string; value: string }[];
  gallery: string[];
}

export const serviceDetailsData: ServiceDetail[] = [
  {
    slug: 'architectural-visualization',
    title: 'Architectural Visualization',
    subtitle: 'Exterior Renders & Masterplans',
    description:
      'We craft photo-realistic exterior renders that capture the true soul of a building before a single brick is laid. From intimate facades to vast urban masterplans, our work bridges imagination and reality.',
    longDescription:
      'Our architectural visualization service transforms CAD data and blueprinted concepts into hyper-realistic CGI representations of future buildings. We focus heavily on realistic environmental lighting, natural vegetation, accurate texture maps, and convincing physical elements. By placing unbuilt architecture into contextual, living settings, we assist real estate developers, municipal boards, and design studios in visualizing masterplans, high-rises, and luxury residential projects. Each image is meticulously graded and layered with specific lighting conditions (golden hour, twilight, overcast day) to highlight the architectural volume, design materials, and scale.',
    heroImage: '/hero_tower.png',
    iconName: 'Building2',
    features: [
      'High-end photo-realistic architectural CGI still frames',
      'Accurate environmental & lighting simulations (Golden Hour, Twilight, Night)',
      'Aerial, drone-based site photogrammetry integration',
      'Realistic contextual environment modeling & custom landscaping'
    ],
    benefits: [
      {
        title: 'Accelerate Pre-Sales',
        desc: 'Enable marketing and sales teams to secure off-plan buyer bookings and investor commitments long before groundbreaking.'
      },
      {
        title: 'Design Validation',
        desc: 'Test architectural materials, cladding systems, and volumetric forms in various lighting conditions before material selection.'
      },
      {
        title: 'Regulatory Approvals',
        desc: 'Present clear, photorealistic representations of structural context to city planning committees and public hearings for faster clearance.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Asset Import & CAD Processing',
        desc: 'We ingest your DWGs, Revit models, or Rhino files and audit the mesh geometry to build a clean baseline scene.'
      },
      {
        step: '02',
        title: 'Camera Direction & Composition',
        desc: 'We set up dynamic camera viewpoints and lens heights, recommending shots that showcase the building’s scale and signature design language.'
      },
      {
        step: '03',
        title: 'Material Mapping & Lighting Setup',
        desc: 'We apply highly accurate, physically-based materials (PBR) to facades and establish real-world lighting environments.'
      },
      {
        step: '04',
        title: 'Render & Post-Production Styling',
        desc: 'Our high-performance render farm processes the visual frames, which are then refined through expert color grading and detail matching.'
      }
    ],
    specs: [
      { label: 'Source Compatibility', value: 'Revit, AutoCAD, Rhino, SketchUp, FBX, OBJ' },
      { label: 'Maximum Resolution', value: 'Up to 12K for physical hoarding prints, 4K standard' },
      { label: 'Standard Delivery', value: '8–14 working days per batch of renders' },
      { label: 'Materials Engine', value: 'Unreal Engine, V-Ray, Corona Renderer' }
    ],
    gallery: ['/hero_tower.png', '/portfolio_tower.png', '/portfolio_villa.png']
  },
  {
    slug: 'interior-rendering',
    title: 'Interior Rendering',
    subtitle: 'Spatial Experience & Atmosphere',
    description:
      'Immersive interior visualizations that bring spatial concepts to vivid, emotional life. We obsess over light, material, and proportion to produce images that make spaces feel inhabited before they exist.',
    longDescription:
      'Our interior rendering service is dedicated to crafting highly detailed, atmosphere-rich views of unbuilt interior spaces. Whether modeling an expansive commercial office lobby, a luxury hotel suite, or a premium residential penthouse, we simulate the interaction of artificial light and natural daylight on various interior finishes. We curate and custom-model furnishings, lighting fixtures, drapery, and styling props to reflect the intended interior design philosophy. By placing special emphasis on wood grains, marble veining, fabric textures, and subtle reflections, we create images that convey a tactile, premium quality.',
    heroImage: '/portfolio_urban.png',
    iconName: 'Home',
    features: [
      'Ultra-precise material texture mapping (fabrics, metals, stones)',
      'Advanced global illumination & artificial light path tracing',
      'Curated furniture dressing & bespoke furniture modeling',
      'Wide-angle spatial shots & close-up material detail closeups'
    ],
    benefits: [
      {
        title: 'Emotional Connection',
        desc: 'Create highly relatable, emotional visuals showing beautifully styled spaces that make clients visualize themselves living or working in them.'
      },
      {
        title: 'Material Matching Validation',
        desc: 'Compare different color palettes, wood species, marbles, and fabrics side-by-side to approve the interior designer’s specification.'
      },
      {
        title: 'B2B Sales Support',
        desc: 'Equip leasing brokers with beautiful imagery to attract marquee commercial tenants or corporate office clients.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Concept & Dressing Briefing',
        desc: 'We review your interior design drawings, spec sheets, material boards, and furniture selection guides.'
      },
      {
        step: '02',
        title: 'Interior Modeling & Styling',
        desc: 'We construct the interior walls, ceilings, custom millwork, and populate the space with high-quality styled furniture props.'
      },
      {
        step: '03',
        title: 'Material Mapping & Lighting Setup',
        desc: 'We map physically-based materials (PBR) and calibrate artificial fixtures (IES files) alongside daylight to match real-world specifications.'
      },
      {
        step: '04',
        title: 'Atmospheric Post-Production',
        desc: 'We render the views and add photographic lens effects, contrast balancing, and color grading to emphasize the mood.'
      }
    ],
    specs: [
      { label: 'Asset Library', value: 'Thousands of premium designer furniture models and custom mapping capabilities' },
      { label: 'Lighting Accuracy', value: 'IES profile integration matching manufacturer light fixtures' },
      { label: 'Deliverable Formats', value: 'PNG, TIFF (16-bit color for print publishing), JPG' },
      { label: 'Turnaround Time', value: '6–10 working days per room/space' }
    ],
    gallery: ['/portfolio_urban.png', '/interior_render.png', '/portfolio_villa.png']
  },
  {
    slug: 'product-visualization',
    title: 'Product Visualization',
    subtitle: 'Design Objects & Fixtures',
    description:
      'Precision-crafted 3D product renders that elevate your design story. From architectural hardware to bespoke furniture collections, we create imagery that sells.',
    longDescription:
      'Our product visualization service allows manufacturers, designers, and e-commerce brands to show off physical products in perfect studio lighting. We take CAD manufacturing files or physical specimens and reconstruct them as high-precision 3D meshes. This service is ideal for catalog rendering, marketing campaigns, and interactive web configuration. Instead of organizing expensive physical studio photography, product rendering lets you generate consistent, clean images of products from any angle, with any material or finish configuration, in infinite environments.',
    heroImage: '/portfolio_villa.png',
    iconName: 'Box',
    features: [
      'High-fidelity studio lighting setups and product photography simulation',
      'PBR material mapping for plastic, steel, glass, and brushed metals',
      '360-degree turntable animation loops and web-ready animations',
      'In-situ lifestyle placements (e.g. fixtures inside a luxury kitchen context)'
    ],
    benefits: [
      {
        title: 'Infinite Customization',
        desc: 'Generate thousands of SKU variations (colors, sizes, textures) without manufacturing a single physical prototype.'
      },
      {
        title: 'Studio Quality Control',
        desc: 'Eliminate reflections from camera rigs, physical dust, or manufacturing blemishes, yielding mathematically perfect product profiles.'
      },
      {
        title: 'E-commerce Pre-Launch',
        desc: 'Begin digital marketing campaigns and secure e-commerce retail distribution channels while the assembly line is still being configured.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Manufacturing Data Import',
        desc: 'We import industrial CAD models (STEP, IGES) and rebuild/re-topologize the meshes for rendering.'
      },
      {
        step: '02',
        title: 'Studio Lighting Setup',
        desc: 'We design custom virtual studio layouts, softboxes, and reflectors to highlight the contours and textures of the product.'
      },
      {
        step: '03',
        title: 'Material Calibration',
        desc: 'We map precise specular, roughness, and metalness profiles to simulate real materials under studio bulbs.'
      },
      {
        step: '04',
        title: 'Batch Image Rendering',
        desc: 'We run high-resolution renders from multiple angles, delivering e-commerce assets or contextual lifestyle scenes.'
      }
    ],
    specs: [
      { label: 'Import Formats', value: 'STEP, IGES, SolidWorks, OBJ, FBX' },
      { label: 'Render Resolutions', value: '4K standard, up to 16K macro-details' },
      { label: 'Compositing Options', value: 'Alpha transparent backgrounds, shadow catcher passes' },
      { label: 'Turnaround Time', value: '4–7 working days per collection' }
    ],
    gallery: ['/portfolio_villa.png', '/portfolio_urban.png']
  },
  {
    slug: 'virtual-experiences',
    title: 'Virtual Experiences',
    subtitle: 'Interactive VR Walkthroughs',
    description:
      'Transport your clients into unbuilt spaces with our interactive VR walkthroughs. Powered by Unreal Engine, these real-time experiences close sales before construction begins.',
    longDescription:
      'Our virtual experience service leverages advanced real-time game engine technology to create fully interactive unbuilt spaces. Rather than viewing static renders, users can freely walk through an entire residence, commercial lobby, or museum using their browser, touch screens, or VR headsets. Clients can interact with the environment in real time—changing flooring materials, testing paint options, altering the time of day, or switching kitchen cabinets. This level of immersion is perfect for marketing galleries, sales centers, and design review sessions where clients want to feel the true sense of scale and spatial volume.',
    heroImage: '/portfolio_museum.png',
    iconName: 'Play',
    features: [
      'Fully interactive, real-time environment walk/fly modes',
      'Real-time material and color customizer controls',
      'Cross-platform deployment (Meta Quest VR, Mobile, Web Browser, Touch Kiosks)',
      'Sales gallery interactive screen integrations'
    ],
    benefits: [
      {
        title: 'True Spatial Understanding',
        desc: 'Allow buyers to walk around and perceive room heights, sightlines, and spatial flow in a way still images can never convey.'
      },
      {
        title: 'Unmatched Interaction',
        desc: 'Keep buyers engaged by letting them customize the layout, finishes, and furniture configurations inside their prospective home.'
      },
      {
        title: 'Sales Gallery Showstopper',
        desc: 'Create an unforgettable experiential marketing suite in your sales gallery, increasing foot traffic and conversion rates.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Optimization & Retopology',
        desc: 'We convert complex architectural geometry into highly optimized meshes suited for real-time engine processing.'
      },
      {
        step: '02',
        title: 'Real-time Scene Assembly',
        desc: 'We construct the workspace within Unreal Engine, placing materials, baking lights, and designing interactive triggers.'
      },
      {
        step: '03',
        title: 'Blueprint & UI Programming',
        desc: 'We program the interactive functions: material customizers, door animations, daylight controls, and map integrations.'
      },
      {
        step: '04',
        title: 'Deployment & Calibration',
        desc: 'We build packages for VR headsets, web clients, or custom kiosk systems, ensuring peak framerates and stable operation.'
      }
    ],
    specs: [
      { label: 'Core Platform', value: 'Unreal Engine 5 with Lumen real-time global illumination' },
      { label: 'VR Compatibility', value: 'Meta Quest 2/3, Meta Quest Pro, HTC Vive Focus 3' },
      { label: 'Delivery Channels', value: 'Stand-alone VR build, Pixel streaming web links, Local EXE installers' },
      { label: 'Turnaround Time', value: '4–8 weeks depending on spatial scope' }
    ],
    gallery: ['/portfolio_museum.png', '/portfolio_tower.png']
  },
  {
    slug: '3d-animation',
    title: '3D Animation',
    subtitle: 'Cinematic Fly-through Films',
    description:
      'Cinematic fly-through animations that narrate architectural stories with motion and depth. Our films are crafted to broadcast quality, ready for marketing campaigns and award submissions.',
    longDescription:
      'Our 3D animation service produces broadcast-quality marketing films that combine architecture, lifestyle, and visual storytelling. Rather than simple, linear walkthroughs, we write custom storyboards, create cinematic camera movements, simulate moving characters/traffic, and integrate soundscapes or custom voiceovers. We construct complete surrounding environments so that views from the penthouse or balcony accurately reflect the real-world skyline or site context. These animations are perfect for landmark tower launches, capital raising campaigns, and luxury brand storytelling.',
    heroImage: '/obsidian_spire.png',
    iconName: 'Film',
    features: [
      'Cinematic, choreographed camera movements mimicking film rigs',
      'Realistic kinetic elements (moving clouds, water ripples, swaying foliage, traffic, people)',
      'Custom storytelling scripts, voiceover narration, and license-cleared soundscapes',
      'Social media aspect ratios and TV broadcast standard outputs'
    ],
    benefits: [
      {
        title: 'High-Impact Brand Building',
        desc: 'Create an emotional, cinematic experience that showcases your project’s lifestyle, values, and brand statement.'
      },
      {
        title: 'Crowdfunding & Investor Pitching',
        desc: 'Deliver a powerful, self-contained video pitch that clearly explains massive urban scales and mixed-use environments in minutes.'
      },
      {
        title: 'Omnichannel Campaigns',
        desc: 'Deploy high-quality video content across Instagram, YouTube, TV commercials, and sales gallery video walls.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Storyboard & Scripting',
        desc: 'We collaborate to write a voiceover script and lay out a storyboard detailing key camera shots and narrative beats.'
      },
      {
        step: '02',
        title: 'Animatic Pre-visualization',
        desc: 'We render low-resolution grey-box animations to test camera speed, lenses, and overall timing prior to high-res rendering.'
      },
      {
        step: '03',
        title: 'High-Resolution Rendering',
        desc: 'We render full CGI frames with complete materials, lighting, and moving details using our dedicated render farm.'
      },
      {
        step: '04',
        title: 'Editing & Sound Design',
        desc: 'We compile the rendered clips, perform professional color grading, apply visual effects, and master the audio track.'
      }
    ],
    specs: [
      { label: 'Video Standards', value: '4K resolution at 24fps or 30fps (8K capability available)' },
      { label: 'Audio Details', value: 'Stereo or 5.1 surround sound mastering, royalty-cleared tracks' },
      { label: 'Delivery Formats', value: 'MP4 (ProRes available upon request), MOV' },
      { label: 'Turnaround Time', value: '4–7 weeks based on script length' }
    ],
    gallery: ['/obsidian_spire.png', '/portfolio_tower.png', '/portfolio_museum.png']
  },
  {
    slug: 'design-consulting',
    title: 'Design Consulting',
    subtitle: 'Strategic Creative Direction',
    description:
      'Strategic visual consulting to align your creative direction with your project ambition. We help architecture firms define their visual language and maintain consistency across all deliverables.',
    longDescription:
      'Our design consulting service offers strategic creative direction to help developers, architecture firms, and luxury brands align their visual marketing with their brand values. We evaluate your current portfolio presentation, audit your visual pipeline, and design a custom style guide to maintain consistency. From selecting rendering styles and lighting principles to designing customized asset libraries, we work alongside your creative teams to elevate every visual touchpoint.',
    heroImage: '/studio_image.png',
    iconName: 'Layers',
    features: [
      'Visual asset audit and portfolio style review',
      'Custom visual style guides and brand rendering guidelines',
      'Art direction advisory for massive real estate launch campaigns',
      'Asset library setup and rendering pipeline design'
    ],
    benefits: [
      {
        title: 'Consistent Brand Language',
        desc: 'Ensure all rendering partners, marketing agencies, and internal designers follow the exact same visual identity and quality standards.'
      },
      {
        title: 'Elevate Portfolio Appeal',
        desc: 'Refine your presentations to appeal specifically to high-net-worth investors, elite architectural juries, and luxury buyers.'
      },
      {
        title: 'Streamlined Delivery',
        desc: 'Establish clear technical standards and templates, drastically reducing revision cycles with external CGI vendors.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Audit & Analysis',
        desc: 'We review your historic marketing assets, competition entries, website visuals, and present our findings.'
      },
      {
        step: '02',
        title: 'Visual Identity Strategy',
        desc: 'We define the appropriate mood boards, camera rules, lighting principles, and post-production filters for your brand.'
      },
      {
        step: '03',
        title: 'Guidelines & Style Guide',
        desc: 'We create a comprehensive style manual containing technical requirements, camera framing standards, and material palettes.'
      },
      {
        step: '04',
        title: 'Implementation & Advisory',
        desc: 'We run onboarding workshops with your teams and provide ongoing art direction feedback on your active campaigns.'
      }
    ],
    specs: [
      { label: 'Deliverables', value: 'Brand Visual Standards PDF, Custom CGI Asset Libraries, Technical Pipeline Templates' },
      { label: 'Review Cadence', value: 'Bi-weekly consultation meetings and ongoing rendering audits' },
      { label: 'Strategic Coverage', value: 'Still images, films, website interactions, and brochure layout styles' },
      { label: 'Service Term', value: 'Retainer-based or project-scoped engagements' }
    ],
    gallery: ['/studio_image.png', '/portfolio_tower.png']
  }
];
