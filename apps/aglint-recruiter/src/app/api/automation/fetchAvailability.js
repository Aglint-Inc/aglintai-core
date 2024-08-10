const { supabase } = require('./config');

async function fetchLatestCandidateAvailability(applicationId) {
    const { data, error } = await supabase
        .from('candidate_request_availability')
        .select('id, number_of_days, number_of_slots')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching the latest candidate request availability:', error);
        return null;
    }

    return data;
}

module.exports = {
    fetchLatestCandidateAvailability,
};
