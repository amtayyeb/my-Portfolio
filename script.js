// Portfolio interactivity: theme, menu, typing text, filters, contact form

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
// theme (guarded storage)
const root = document.documentElement;
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t } catch (e) { }
$("#theme").onclick = () => { const t = root.dataset.theme === "dark" ? "light" : "dark"; root.dataset.theme = t; try { localStorage.setItem("theme", t) } catch (e) { } };
// mobile menu
$("#menu").onclick = () => $("#nav").classList.toggle("open");
$$("#nav a").forEach(a => a.onclick = () => $("#nav").classList.remove("open"));
// typing effect
const roles = ["Full Stack Developer", "MERN Stack Developer", "React Developer", "Open to job, internship and freelance"];
let ri = 0, ci = 0, del = false; const ty = $("#type");
if (matchMedia("(prefers-reduced-motion:reduce)").matches) { ty.textContent = roles[0] } else {
        (function tick() {
                const w = roles[ri]; ci += del ? -1 : 1; ty.textContent = w.slice(0, ci); let d = del ? 35 : 75;
                if (!del && ci === w.length) { del = true; d = 1400 } else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; d = 300 }
                setTimeout(tick, d)
        })()
}
// scroll: progress, back-to-top, reveal, active link
addEventListener("scroll", () => { const h = document.documentElement; $("#bar").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%"; $("#top").classList.toggle("show", h.scrollTop > 600) }, { passive: true });
$("#top").onclick = () => scrollTo({ top: 0 });
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target) } }), { threshold: .12 });
$$(".rv").forEach(el => io.observe(el));
const spy = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { $$("#nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + x.target.id)) } }), { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => spy.observe(s));
// filters
$$(".tabs").forEach(box => {
        const cls = box.dataset.for; box.onclick = e => {
                const b = e.target.closest(".tab"); if (!b) return;
                [...box.children].forEach(c => c.classList.toggle("on", c === b));
                $$("." + cls).forEach(el => el.classList.toggle("hide", b.dataset.f !== "all" && el.dataset.c !== b.dataset.f))
        }
});
// contact form
const NUM = "923700732535", MAIL = "amtayyeb8865@gmail.com";
function check() {
        let ok = true; const n = $("#n").value.trim(), e = $("#e").value.trim(), m = $("#m").value.trim();
        $("#en").textContent = n ? "" : "Please enter your name.";
        $("#ee").textContent = /^\S+@\S+\.\S+$/.test(e) ? "" : "Please enter a valid email.";
        $("#em").textContent = m.length >= 10 ? "" : "Please write at least 10 characters.";
        return !!n && /^\S+@\S+\.\S+$/.test(e) && m.length >= 10
}
function text() { return `Hello Tayyeb, I am ${$("#n").value.trim()} (${$("#e").value.trim()}). I am contacting you about: ${$("#t").value}.\n\n${$("#m").value.trim()}` }
$("#form").onsubmit = ev => {
        ev.preventDefault(); if (!check()) return;
        location.href = `mailto:${MAIL}?subject=${encodeURIComponent("Portfolio: " + $("#t").value)}&body=${encodeURIComponent(text())}`;
        $("#status").textContent = "Your email app is opening. Press send there to finish."
};
$("#wa").onclick = () => { if (!check()) return; open(`https://wa.me/${NUM}?text=${encodeURIComponent(text())}`, "_blank"); $("#status").textContent = "WhatsApp is opening with your message." };
$("#yr").textContent = new Date().getFullYear();
