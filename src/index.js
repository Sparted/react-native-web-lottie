import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { View } from 'react-native';
import lottie from 'lottie-web';

class Animation extends PureComponent {
  animationDOMNode = null;

  componentDidMount() {
    this.loadAnimation(this.props);

    if (this.props.progress) {
      this.props.progress.addListener((progress) => {
        const { value } = progress;
        let frame = value / (1 / this.anim.getDuration(true));
        this.anim.goToAndStop(frame, true);
      });
    }
  }

  componentWillUnmount() {
    if (this.props.progress)
	    this.props.progress.removeAllListeners();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.source && nextProps.source && this.props.source.nm !== nextProps.source.nm) {
      this.loadAnimation(nextProps);
    }
  }

  loadAnimation = props => {
    if (this.anim) {
      this.anim.destroy();
    }

    this.anim = lottie.loadAnimation({
      container: this.animationDOMNode,
      animationData: props.source,
      renderer: 'svg',
      loop: props.loop || false,
      autoplay: props.autoPlay,
      rendererSettings: props.rendererSettings || {},
    });
  };

  setAnimationDOMNode = ref => (this.animationDOMNode = ReactDOM.findDOMNode(ref));

  render() {
    return <View style={this.props.style} ref={this.setAnimationDOMNode} />;
  }
}

export default React.forwardRef((props, ref) => (
  <Animation {...props} ref={typeof ref == 'function' ? c => ref(c && c.anim) : ref} />
));
