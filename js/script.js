const WHATSAPP_NUMBER = "5531971401928";

function getCheckedServices(formEl) {
  const checks = formEl.querySelectorAll('input[type="checkbox"]:checked');
  return Array.from(checks).map((c) => c.value);
}

function buildMessage(data) {
  const lines = [
    "Olá! Gostaria de um orçamento com a *Limpa Vidros* ✅",
    "",
    `👤 Nome: ${data.nome}`,
    `📍 Local: ${data.local}`,
    `🏠 Tipo: ${data.tipo}`,
    data.horario ? `🗓️ Melhor horário: ${data.horario}` : null,
    "",
    "🧾 Serviços desejados:",
    data.servicos.length ? data.servicos.map(s => `• ${s}`).join("\n") : "• (não selecionado)",
    "",
    data.detalhes ? `📝 Detalhes: ${data.detalhes}` : "📝 Detalhes: (não informado)",
    "",
    "Obrigado!"
  ].filter(Boolean);

  return lines.join("\n");
}

document.addEventListener("DOMContentLoaded", () => {
  // Ano no footer
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // Menu mobile
  const btnMenu = document.getElementById("btnMenu");
  const menu = document.getElementById("menu");

  if (btnMenu && menu) {
    btnMenu.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      btnMenu.setAttribute("aria-expanded", String(open));
    });

    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        menu.classList.remove("is-open");
        btnMenu.setAttribute("aria-expanded", "false");
      });
    });

    // Fecha se clicar fora
    document.addEventListener("click", (e) => {
      if (!menu.classList.contains("is-open")) return;
      const clickDentro = menu.contains(e.target) || btnMenu.contains(e.target);
      if (!clickDentro) {
        menu.classList.remove("is-open");
        btnMenu.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Formulário -> WhatsApp
  const form = document.getElementById("formOrcamento");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const local = document.getElementById("local").value.trim();
      const tipo = document.getElementById("tipo").value;
      const horario = document.getElementById("horario").value.trim();
      const detalhes = document.getElementById("detalhes").value.trim();

      const servicos = getCheckedServices(form);

      const message = buildMessage({ nome, local, tipo, horario, detalhes, servicos });
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      window.open(url, "_blank");
    });
  }
});
