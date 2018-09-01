// @flow
import React, { Component } from 'react';
import disabled from 'ally.js/maintain/disabled';

type Props = {
  addPanel: $PropertyType<ProviderValue, 'addPanel'>,
  className?: ?string,
  disableInnert?: boolean,
  expandedClass?: string,
  expanded?: boolean,
  id: string,
  isExpanded?: boolean,
};

class AccordionPanel extends Component<Props> {
  static defaultProps = {
    expandedClass: 'is-expanded',
  }

  constructor(props: Props) {
    super(props);
    this.handleInnert = null;
    this.ref = React.createRef();
    this.props.addPanel(this.props.id, this.ref, !!this.props.expanded);
  }

  componentDidMount() {
    if (this.ref.current && !this.props.disableInnert) {
      this.handleInnert = this.props.isExpanded ? null : disabled({
        context: this.ref.current,
      });
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.props.isExpanded !== nextProps.isExpanded;
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.disableInnert) return;

    if (this.props.isExpanded && this.handleInnert) {
      this.handleInnert.disengage();
    } else if (typeof prevProps.isExpanded !== 'undefined' && this.ref.current) {
      this.handleInnert = disabled({
        context: this.ref.current,
      });
    }
  }

  componentWillUnmount() {
    if (!this.handleInnert) return;
    this.handleInnert.disengage();
    this.handleInnert = null;
  }

  handleInnert: null | { disengage: () => void };

  ref: PanelRef;

  render() {
    const {
      addPanel,
      className,
      disableInnert,
      expanded,
      expandedClass,
      isExpanded,
      ...rest
    } = this.props;
    return (
      <dd
        className={getClassName(className, expandedClass, isExpanded)}
        ref={this.ref}
        {...rest}
      />
    );
  }
}

function getClassName(className, expandedClass, isExpanded): ?string {
  const name = [
    className || '',
    isExpanded ? expandedClass : '',
  ].join(' ').trim();
  return name.length ? name : null;
}

export default AccordionPanel;
