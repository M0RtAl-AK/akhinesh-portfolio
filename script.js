document.addEventListener('DOMContentLoaded', () => {
    // Ensure portfolioData is loaded
    if (typeof portfolioData === 'undefined') {
        console.error('portfolioData is missing. Check content.js');
        return;
    }

    /* =========================================
       1. INJECT CONTENT FROM content.js
       ========================================= */
    
    // Page Title
    document.title = portfolioData.personal.title;

    // Navbar Socials
    const navSocialsContainer = document.getElementById('nav-socials');
    portfolioData.socials.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.target = "_blank";
        link.innerHTML = `<i class="${social.icon}"></i>`;
        navSocialsContainer.appendChild(link);
    });
    
    // Add Email Copy Button to Navbar
    const navEmailBtn = document.createElement('button');
    navEmailBtn.innerHTML = `<i class="fas fa-envelope"></i>`;
    navEmailBtn.addEventListener('click', () => copyEmail(portfolioData.personal.email));
    navSocialsContainer.appendChild(navEmailBtn);

    // Hero Section
    document.getElementById('hero-headline').innerText = portfolioData.hero.headline;
    document.getElementById('hero-subheadline').innerText = portfolioData.hero.subheadline;
    document.getElementById('hero-image').src = portfolioData.hero.profileImage;
    
    const badgesContainer = document.getElementById('hero-badges');
    if (portfolioData.hero.floatingBadges) {
        portfolioData.hero.floatingBadges.forEach(badge => {
            const badgeEl = document.createElement('div');
            badgeEl.className = 'hero-badge';
            badgeEl.innerText = badge.text;
            badgesContainer.appendChild(badgeEl);
        });
    }
    
    // Hero Stats
    const statsContainer = document.getElementById('hero-stats');
    portfolioData.hero.stats.forEach(stat => {
        const statEl = document.createElement('div');
        statEl.className = 'stat-item';
        statEl.innerHTML = `<h3>${stat.value}</h3><p>${stat.label}</p>`;
        statsContainer.appendChild(statEl);
    });

    // Hero CTAs
    const ctasContainer = document.getElementById('hero-ctas');
    const primaryBtn = document.createElement('a');
    primaryBtn.href = portfolioData.hero.primaryCTA.link;
    primaryBtn.className = 'btn btn-primary';
    primaryBtn.innerText = portfolioData.hero.primaryCTA.label;
    
    const secondaryBtn = document.createElement('a');
    secondaryBtn.href = portfolioData.hero.secondaryCTA.link;
    secondaryBtn.className = 'btn btn-outline';
    secondaryBtn.innerText = portfolioData.hero.secondaryCTA.label;
    if(portfolioData.hero.secondaryCTA.link.startsWith('http')) {
        secondaryBtn.target = "_blank";
    }
    
    ctasContainer.appendChild(primaryBtn);
    ctasContainer.appendChild(secondaryBtn);

    // Floating Tags
    const tagsContainer = document.getElementById('hero-tags');
    portfolioData.hero.floatingTags.forEach((tag, index) => {
        const tagEl = document.createElement('div');
        tagEl.className = 'floating-tag';
        tagEl.innerText = tag;
        
        // Randomize positions somewhat
        const topPositions = ['15%', '25%', '70%', '80%'];
        const leftPositions = ['10%', '75%', '15%', '80%'];
        const delays = ['0s', '1.5s', '3s', '4.5s'];
        
        tagEl.style.top = topPositions[index % 4];
        tagEl.style.left = leftPositions[index % 4];
        tagEl.style.animationDelay = delays[index % 4];
        
        tagsContainer.appendChild(tagEl);
    });

    // Journey Timeline
    const timelineContainer = document.getElementById('timeline');
    portfolioData.journey.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'timeline-item fade-in-up';
        
        itemEl.innerHTML = `
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-role">${item.role}</div>
            <div class="timeline-short">${item.shortDesc}</div>
            <div class="timeline-full" id="timeline-full-${index}">${item.fullDesc}</div>
            <button class="read-more-btn" onclick="toggleReadMore(${index})">Read more</button>
        `;
        timelineContainer.appendChild(itemEl);
    });

    // Projects Grid
    const projectsContainer = document.getElementById('projects-grid');
    portfolioData.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card fade-in-up';
        
        const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        
        card.innerHTML = `
            <div class="project-subtitle">${project.subtitle}</div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.description}</p>
            <div class="project-tags">${tagsHtml}</div>
        `;
        projectsContainer.appendChild(card);
    });

    // Skills
    const skillsContainer = document.getElementById('skills-container');
    portfolioData.skills.forEach(skill => {
        const skillEl = document.createElement('div');
        skillEl.className = 'skill-card fade-in-up';
        skillEl.innerText = skill;
        skillsContainer.appendChild(skillEl);
    });

    // Achievements
    const achievementsContainer = document.getElementById('achievements-list');
    portfolioData.achievements.forEach(ach => {
        const achEl = document.createElement('div');
        achEl.className = 'achievement-item fade-in-up';
        achEl.innerText = ach;
        achievementsContainer.appendChild(achEl);
    });

    // Indirect Contributions
    const indirectContainer = document.getElementById('indirect-contributions-list');
    if (portfolioData.indirectContributions) {
        portfolioData.indirectContributions.forEach(ic => {
            const icEl = document.createElement('div');
            icEl.className = 'indirect-item fade-in-up';
            icEl.innerText = ic;
            indirectContainer.appendChild(icEl);
        });
    }

    // Education & Certifications
    const eduContainer = document.getElementById('edu-section');
    portfolioData.education.forEach(edu => {
        const eduEl = document.createElement('div');
        eduEl.className = 'edu-item fade-in-up';
        eduEl.innerHTML = `
            <div class="edu-title">${edu.title}</div>
            <div class="edu-inst">${edu.institution}</div>
            ${edu.duration ? `<div class="edu-duration">${edu.duration}</div>` : ''}
        `;
        eduContainer.appendChild(eduEl);
    });

    const certContainer = document.getElementById('cert-section');
    portfolioData.certifications.forEach(cert => {
        const certEl = document.createElement('div');
        certEl.className = 'cert-item fade-in-up';
        certEl.innerText = cert;
        certContainer.appendChild(certEl);
    });

    // Footer / Contact
    document.getElementById('contact-headline').innerText = portfolioData.contact.headline;
    const contactBtn = document.getElementById('contact-btn');
    contactBtn.innerText = portfolioData.contact.buttonLabel;
    contactBtn.href = portfolioData.contact.buttonLink;

    const footerSocialsContainer = document.getElementById('footer-socials');
    portfolioData.socials.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.target = "_blank";
        link.innerHTML = `<i class="${social.icon}"></i>`;
        footerSocialsContainer.appendChild(link);
    });
    
    // Add Email Copy Button to Footer
    const footerEmailBtn = document.createElement('button');
    footerEmailBtn.innerHTML = `<i class="fas fa-envelope"></i>`;
    footerEmailBtn.addEventListener('click', () => copyEmail(portfolioData.personal.email));
    footerSocialsContainer.appendChild(footerEmailBtn);


    /* =========================================
       2. INTERACTIONS & ANIMATIONS
       ========================================= */

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements that exist now (after injection)
    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
});

/* =========================================
   3. HELPER FUNCTIONS
   ========================================= */

// Toggle Read More in Journey
window.toggleReadMore = function(index) {
    const fullDesc = document.getElementById(`timeline-full-${index}`);
    const btn = fullDesc.nextElementSibling;
    
    if (fullDesc.style.display === 'block') {
        fullDesc.style.display = 'none';
        btn.innerText = 'Read more';
    } else {
        fullDesc.style.display = 'block';
        btn.innerText = 'Read less';
    }
};

// Copy Email to Clipboard
window.copyEmail = function(email) {
    navigator.clipboard.writeText(email).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};
