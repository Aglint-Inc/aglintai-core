const { supabase } = require('./config');

async function updateRequestStatus(requestId, status = 'in_progress') {
    const { error } = await supabase
        .from('request')
        .update({ status })
        .eq('id', requestId);

    if (error) {
        console.error(`Error updating request ${requestId}:`, error);
    }
}

module.exports = {
    updateRequestStatus,
};
