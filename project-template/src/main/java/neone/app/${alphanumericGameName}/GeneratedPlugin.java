package neone.app.${alphanumericGameName};

import io.github.thisisnozaku.charactercreator.plugins.GamePlugin;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;

/**
 * Marker class to tell the OSGi framework that the containing bundle is a game plugin.
 *
 */
@Service(value = GamePlugin.class)
@Component(immediate = true)
public class GeneratedPlugin<T extends Character> extends GamePlugin {

}