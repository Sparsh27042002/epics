document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarButton = document.getElementById('toggleSidebar');
    const toggleSidebarMainButton = document.getElementById('toggleSidebarMain');
    
    const homeSection = document.getElementById('homeSection');
    const profileSection = document.getElementById('profileSection');
    const myCasesSection = document.getElementById('myCasesSection');
    const dashboardSection = document.getElementById('dashboardSection');

    const navHome = document.getElementById('nav-home');
    const navProfile = document.getElementById('nav-profile');
    const navMyCases = document.getElementById('nav-my-cases');
    const navDashboard = document.getElementById('nav-dashboard');

    toggleSidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    toggleSidebarMainButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    function activateSection(sectionToShow) {
        const sections = [homeSection, profileSection, myCasesSection, dashboardSection];
        sections.forEach(section => {
            if (section === sectionToShow) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    navHome.addEventListener('click', (e) => {
        e.preventDefault();
        activateSection(homeSection);
    });

    navProfile.addEventListener('click', (e) => {
        e.preventDefault();
        activateSection(profileSection);
    });

    navMyCases.addEventListener('click', (e) => {
        e.preventDefault();
        activateSection(myCasesSection);
    });

    navDashboard.addEventListener('click', (e) => {
        e.preventDefault();
        activateSection(dashboardSection);
    });

    // Add form submission and dynamic case rendering
    const caseForm = document.getElementById('caseForm');
    const casesList = document.getElementById('casesList');
    const casesListDashboard = document.getElementById('casesListDashboard');
    let cases = [];

    caseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('caseTitle').value;
        const description = document.getElementById('caseDescription').value;

        cases.push({ title, description });
        renderCases();
        caseForm.reset();
    });

    function renderCases() {
        casesList.innerHTML = '';
        casesListDashboard.innerHTML = '';

        cases.forEach((c, index) => {
            const caseItem = document.createElement('div');
            caseItem.classList.add('case-item');
            caseItem.innerHTML = `<h3>${c.title}</h3><p>${c.description}</p>`;
            casesList.appendChild(caseItem);
            casesListDashboard.appendChild(caseItem.cloneNode(true)); // Add to dashboard as well
        });
    }

    // Handle comment submission
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    let comments = [];

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentText = document.getElementById('commentText').value;

        comments.push(commentText);
        renderComments();
        commentForm.reset();
    });

    function renderComments() {
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment-item');
            commentItem.innerText = comment;
            commentsList.appendChild(commentItem);
        });
    }
});
