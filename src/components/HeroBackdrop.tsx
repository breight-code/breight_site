import { useEffect, useRef } from "react";

// Real-looking lines from the stacks on this page; each row is built from them.
const LINES = [
  "class ShakerInterceptor extends Interceptor {",
  "  void onResponse(Response r, ResponseInterceptorHandler h) => log.add(r);",
  "final state = context.watch<ProjectsBloc>().state;",
  "emit(ProjectsLoaded(await repo.fetchAll()));",
  "app.get('/api/v1/projects', async (req, reply) => reply.send(await db.list()));",
  "const project = await Project.findByPk(id, { include: [Task] });",
  "export type Project = z.infer<typeof ProjectSchema>;",
  "SELECT id, title FROM projects WHERE owner_id = $1 ORDER BY updated_at DESC;",
  "let graph = try await git.log(branch: .current, limit: 500)",
  "struct CommitRow: View { let commit: Commit; var body: some View {",
  "try await repository.stage(lines: selection, in: file)",
  "await queryInterface.addColumn('projects', 'status', DataTypes.STRING);",
  "Future<void> main() async => runApp(const BreightApp());",
  "git rebase -i HEAD~3 && git push --force-with-lease",
  "docker compose up -d && npm run migrate",
  "AnimatedSwitcher(duration: 300.ms, child: _buildPage(index))",
];

const ROW = 26;

export default function HeroBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font = "13px 'JetBrains Mono', ui-monospace, monospace";

    let w = 0, h = 0, raf = 0, visible = true;
    let rows: { text: string; width: number; x: number; speed: number }[] = [];
    const pointer = { x: -999, y: -999, tx: -999, ty: -999 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = font;
      ctx.textBaseline = "middle";
      rows = Array.from({ length: Math.ceil(h / ROW) + 1 }, (_, i) => {
        let text = "";
        let k = i * 7;
        while (ctx.measureText(text).width < w * 1.5) text += LINES[k++ % LINES.length] + "     ";
        const width = ctx.measureText(text).width;
        return { text, width, x: -Math.random() * width, speed: (i % 2 ? -1 : 1) * (8 + (i % 5) * 4) };
      });
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      const pass = (color: string) => {
        ctx.fillStyle = color;
        rows.forEach((r, i) => {
          const y = i * ROW + ROW / 2;
          ctx.fillText(r.text, r.x, y);
          ctx.fillText(r.text, r.x + r.width, y);
        });
      };
      rows.forEach((r) => {
        r.x += r.speed * dt;
        if (r.x <= -r.width) r.x += r.width;
        if (r.x > 0) r.x -= r.width;
      });
      pass("rgba(163, 179, 166, 0.13)");
      // Second pass inside a circle around the pointer: the code lights up where you look.
      ctx.save();
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 170, 0, Math.PI * 2);
      ctx.clip();
      pass("rgba(88, 243, 106, 0.55)");
      ctx.restore();
    };

    let last = performance.now();
    const loop = (now: number) => {
      draw(Math.min((now - last) / 1000, 0.05));
      last = now;
      if (visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      if (reduce) draw(0);
    };
    const onResize = () => { build(); draw(0); };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) { last = performance.now(); raf = requestAnimationFrame(loop); }
    });

    document.fonts.load(font).finally(() => {
      build();
      draw(0);
      io.observe(canvas);
    });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="hero-backdrop" aria-hidden="true" />;
}
