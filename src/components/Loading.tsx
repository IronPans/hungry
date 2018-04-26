import * as React from 'react';
import * as classNames from 'classnames';
import {BaseProps} from 'bee-mobile/lib/common/BaseProps';

interface LoadingProps extends BaseProps {
}

export default class Loading extends React.PureComponent<LoadingProps, {}> {
    static defaultProps = {
        prefixCls: 'rf-Loading'
    };

    render() {
        const {className, children, prefixCls} = this.props;
        const styleClass = classNames(
            prefixCls, className
        );
        return (
            <div className={styleClass}>
                {children}
            </div>
        );
    }
}