let projects = [];
let currentProjectIndex = null;

document.getElementById('new-project-btn').addEventListener('click', () => {
    showEditor();
    clearEditor();
    currentProjectIndex = null;
});

document.getElementById('back-to-dashboard').addEventListener('click', () => {
    showDashboard();
});

document.getElementById('save-project-btn').addEventListener('click', () => {
    const generatedHTML = document.getElementById('generated-code').value;
    if (currentProjectIndex === null) {
        projects.push(generatedHTML);
    } else {
        projects[currentProjectIndex] = generatedHTML;
    }
    updateProjectList();
    showDashboard();
});

function updateProjectList() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
        const li = document.createElement('li');
        li.textContent = `Project ${index + 1}`;
        li.addEventListener('click', () => {
            currentProjectIndex = index;
            loadProject(project);
            showEditor();
        });
        projectList.appendChild(li);
    });
}

function loadProject(project) {
    document.getElementById('drop-area').innerHTML = project;
    updateGeneratedCode();
}

function showDashboard() {
    document.getElementById('project-dashboard').classList.remove('hidden');
    document.getElementById('project-editor').classList.add('hidden');
}

function showEditor() {
    document.getElementById('project-dashboard').classList.add('hidden');
    document.getElementById('project-editor').classList.remove('hidden');
}

function clearEditor() {
    document.getElementById('drop-area').innerHTML = '';
    updateGeneratedCode();
}

document.querySelectorAll('.block').forEach(block => {
    block.addEventListener('dragstart', dragStart);
});

const dropArea = document.getElementById('drop-area');
dropArea.addEventListener('dragover', dragOver);
dropArea.addEventListener('drop', drop);

function dragStart(e) {
    e.dataTransfer.setData('text/html', e.target.getAttribute('data-html'));
}

function dragOver(e) {
    e.preventDefault(); // Necessary to allow dropping
}

function drop(e) {
    e.preventDefault();
    const html = e.dataTransfer.getData('text/html');
    const div = document.createElement('div');
    div.innerHTML = html;
    div.classList.add('dropped-item'); // Optional: for CSS styling
    dropArea.appendChild(div);
    updateGeneratedCode();
}

function updateGeneratedCode() {
    const generatedHTML = dropArea.innerHTML;
    document.getElementById('generated-code').value = generatedHTML;
}
