'use client';

type PointsRichTextToolbarProps = {
  actions: string[];
};

export function PointsRichTextToolbar({ actions }: PointsRichTextToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-2 bg-[#F2F5EA] text-primary-dark/80 text-sm">
      {actions.map((action) =>
        action === '-' ? (
          <span key={action} className="h-5 w-px bg-primary-dark/20" />
        ) : (
          <button
            key={action}
            type="button"
            className="px-2 py-1 rounded-md hover:bg-white/70 transition-colors"
          >
            {action}
          </button>
        ),
      )}
    </div>
  );
}


