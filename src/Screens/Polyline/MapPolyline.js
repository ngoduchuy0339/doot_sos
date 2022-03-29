import PropTypes from "prop-types";
import React from "react";
import { ColorPropType, ViewPropTypes, View } from "react-native";
import decorateMapComponent, {
  USES_DEFAULT_IMPLEMENTATION,
  SUPPORTED
} from "./decorateMapComponent";

// nếu ViewPropTypes không được xác định, quay lại View.propType (để hỗ trợ RN <0,44)
const viewPropTypes = ViewPropTypes || View.propTypes;

const propTypes = {
  ...viewPropTypes,

  /**
   * Mảng tọa độ để mô tả đa giác
   */
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Vĩ độ / Kinh độ
       */
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    })
  ),

  /**
   * Gọi lại được gọi khi người dùng nhấn vào đường đa tuyến
   */
  onPress: PropTypes.func,

  /* Boolean để cho phép một polyline có thể được áp dụng và sử dụng
   * Chức năng onPress
   */
  tappable: PropTypes.bool,

  /**
   * Tô màu để sử dụng cho đường dẫn.
   */
  fillColor: ColorPropType,

  /**
   * Chiều rộng nét cho đường dẫn.
   */
  strokeWidth: PropTypes.number,

  /**
   * Màu nét dùng cho đường dẫn
   */
  strokeColor: ColorPropType,

  /**
   * Các màu nét dùng cho đường dẫn
   */
  strokeColors: PropTypes.arrayOf(ColorPropType),

  /**
   * The order in which this tile overlay is drawn with respect to other overlays. An overlay
   * with a larger z-index is drawn over overlays with smaller z-indices. The order of overlays
   * with the same z-index is arbitrary. The default zIndex is 0.
   *
   * @platform android
   */
  zIndex: PropTypes.number,

  /**
   * The line cap style to apply to the open ends of the path.
   * The default style is `round`.
   *
   * @platform ios
   */
  lineCap: PropTypes.oneOf(["butt", "round", "square"]),

  /**
   * The line join style to apply to corners of the path.
   * The default style is `round`.
   *
   * @platform ios
   */
  lineJoin: PropTypes.oneOf(["miter", "round", "bevel"]),

  /**
   * The limiting value that helps avoid spikes at junctions between connected line segments.
   * The miter limit helps you avoid spikes in paths that use the `miter` `lineJoin` style. If
   * the ratio of the miter length—that is, the diagonal length of the miter join—to the line
   * thickness exceeds the miter limit, the joint is converted to a bevel join. The default
   * miter limit is 10, which results in the conversion of miters whose angle at the joint
   * is less than 11 degrees.
   *
   * @platform ios
   */
  miterLimit: PropTypes.number,

  /**
    * Boolean để cho biết liệu có nên vẽ từng đoạn của đường thẳng làm đường trắc địa hay không các đoạn thẳng trên hình chiếu Mercator. 
    * Đường trắc địa là con đường ngắn nhất giữa hai điểm trên bề mặt Trái đất. 
    * Đường cong trắc địa được xây dựng với giả định Trái đất là một hình cầu.
    * @platform android
  */
  geodesic: PropTypes.bool,

  /**
   * Độ lệch (tính bằng điểm) để bắt đầu vẽ mẫu gạch ngang.
   *
   * Sử dụng thuộc tính này để bắt đầu vẽ một đoạn đường đứt nét qua một đoạn hoặc khoảng trống.
   *
   * Giá trị mặc định của thuộc tính này là 0.
   *
   * @platform ios
   */
  lineDashPhase: PropTypes.number,

  /**
   * Một mảng số chỉ định mẫu gạch ngang để sử dụng cho đường dẫn.
   *
   * Mảng chứa một hoặc nhiều số cho biết độ dài (được đo bằng điểm) của các đoạn thẳng và khoảng trống trong mẫu. 
   * Các giá trị trong mảng thay thế nhau, bắt đầu bằng độ dài đoạn dòng đầu tiên, tiếp theo là độ dài khoảng trống đầu tiên, 
   * tiếp theo là độ dài đoạn dòng thứ hai, v.v.
   *
   * Thuộc tính này được đặt thành 'null' theo mặc định, cho biết không có mẫu gạch ngang dòng.
   *
   * @platform ios
   */
  lineDashPattern: PropTypes.arrayOf(PropTypes.number)
};

const defaultProps = {
  strokeColor: "#000",
  strokeWidth: 1,
  lineJoin: "round",
  lineCap: "round"
};

class MapPolyline extends React.Component {
  setNativeProps(props) {
    this.polyline.setNativeProps(props);
  }

  render() {
    const AIRMapPolyline = this.getAirComponent();
    return (
      <AIRMapPolyline
        {...this.props}
        ref={ref => {
          this.polyline = ref;
        }}
      />
    );
  }
}

MapPolyline.propTypes = propTypes;
MapPolyline.defaultProps = defaultProps;

export default decorateMapComponent(MapPolyline, {
  componentType: "Polyline",
  providers: {
    google: {
      ios: SUPPORTED,
      android: USES_DEFAULT_IMPLEMENTATION
    }
  }
});
