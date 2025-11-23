interface Idea {
  title: string;
  description: string;
  author: string;
  date: string;
}

const form = document.getElementById("ideaForm") as HTMLFormElement;
const list = document.getElementById("ideaList") as HTMLUListElement;

let ideas: Idea[] = [];

// Load stored ideas
window.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("ideas");
  if (stored) {
    ideas = JSON.parse(stored);
    renderIdeas();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = document.getElementById("title") as HTMLInputElement;
  const descInput = document.getElementById("description") as HTMLTextAreaElement;
  const authorInput = document.getElementById("author") as HTMLInputElement;

  const newIdea: Idea = {
    title: titleInput.value.trim(),
    description: descInput.value.trim(),
    author: authorInput.value.trim(),
    date: new Date().toLocaleString()
  };

  ideas.push(newIdea);
  localStorage.setItem("ideas", JSON.stringify(ideas));

  renderIdeas();
  form.reset();
});

function renderIdeas() {
  list.innerHTML = "";
  ideas.forEach((idea) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${idea.title}</strong><br>
      <p>${idea.description}</p>
      <small>Propus de: <em>${idea.author}</em> – ${idea.date}</small>
    `;
    list.appendChild(li);
  });
}
