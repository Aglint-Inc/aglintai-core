const { supabase } = require('./config');

async function updateCandidateAvailabilitySlots(applicationId, filteredSlots) {
    const { error } = await supabase
        .from('candidate_request_availability')
        .update({ slots: filteredSlots })
        .eq('application_id', applicationId)
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error('Error updating slots:', error);
    }
}

module.exports = {
    updateCandidateAvailabilitySlots,
};
