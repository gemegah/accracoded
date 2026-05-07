export function CrisisDialog() {
  return (
    <div className="c-dialog-overlay" id="crisis-overlay" aria-hidden="true" hidden>
      <div className="c-dialog" role="dialog" aria-modal="true" aria-labelledby="crisis-title" aria-describedby="crisis-note" tabIndex={-1}>
        <h2 className="dialog-title" id="crisis-title">Get support now</h2>
        <p className="body-sub" id="crisis-note">You do not have to be in crisis to call. If you need to talk to someone, these lines are open.</p>
    
        <div className="dialog-list" id="crisis-directory"></div>
    
        <button type="button" className="c-button c-button--secondary" data-action="hide-crisis">Close</button>
      </div>
    </div>
  );
}
