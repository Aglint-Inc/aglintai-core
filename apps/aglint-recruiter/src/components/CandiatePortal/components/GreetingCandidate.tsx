import React from 'react';

function GreetingCandidate({ sentence }: { sentence: string }) {
  return (
    <div className="mt-2 p-4 bg-purple-100 rounded-lg">
    <p className="text-sm">
        {sentence}
    </p>
  </div>
  );
}

export default GreetingCandidate;
