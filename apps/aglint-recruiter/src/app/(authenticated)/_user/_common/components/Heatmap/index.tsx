import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';

import Heatmap from '@/components/Common/Heatmap/HeatmapUser';

export const HeatmapUser = ({ loadSetting }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Meetings overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Heatmap loadSetting={loadSetting} />
      </CardContent>
    </Card>
  );
};
