import React from 'react'
import { Header, List, Progress, Segment } from 'semantic-ui-react'
import { getGoalColor } from '../utils/goalUtils';

export default function ProgressModule({content, hNum}) {

    return (
        <List as={Segment}>
            {content.map(o =>
                <List.Item key={o.key}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Header as={hNum}>
                        { o.title ? o.title : o.type  }
                    </Header>
                    <span style={{fontWeight: 'bold'}}>{`(${o.complete} of ${o.total})`}</span>
                </div>
                    <Progress size='tiny' color={getGoalColor(o.type).color} value={o.complete} total={o.total} />
                </List.Item>
            )}
        </List>
    )
}
