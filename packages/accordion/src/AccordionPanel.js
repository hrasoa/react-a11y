// @flow
import * as React from 'react';

type Props = {
  /** @public */
  id: string,
  /** @public */
  expandedClass?: string,
  /** @public */
  expanded?: boolean,
  children: string | React.Node,
  addPanel: (
    id: string,
    ref: { current: null | HTMLElement },
    isInitiallyExpanded: ?boolean,
  ) => void,
  className?: string,
  isExpanded?: boolean,
};

/** AccordionPanel descripiion */
class AccordionPanel extends React.Component<Props> {
  static defaultProps = {
    expandedClass: 'is-expanded',
  }

  constructor(props: Props) {
    super(props);
    this.props.addPanel(this.props.id, this.ref, this.props.expanded);
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.props.isExpanded !== nextProps.isExpanded;
  }

  ref: { current: null | HTMLElement } = React.createRef();

  render() {
    const {
      className,
      expandedClass,
      isExpanded,
      expanded,
      addPanel,
      ...rest
    } = this.props;
    return (
      <dd
        className={getClassName(this.props)}
        ref={this.ref}
        {...rest}
      />
    );
  }
}

function getClassName({ className, expandedClass, isExpanded }): string | null {
  const name = `${className || ''}${isExpanded ? ` ${expandedClass || ''}` : ''}`;
  return name.length ? name.trim() : null;
}

export default AccordionPanel;
